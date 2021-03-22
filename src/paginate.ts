import { serialize } from 'class-transformer';
import { Repository, FindConditions, FindManyOptions, ILike } from 'typeorm';
import { IPaginationOptions, Page } from './interfaces';

export async function paginate<T>(repository: Repository<T>, options: IPaginationOptions) {
  const defaultPage = 1;
  const defaultPerPage = 3;

  //If we receive just one order option, convert into string[] for correct foreach work
  if (typeof options.order === 'string') {
    options.order = [options.order];
  }

  //If we receive just one order option, convert into string[] for correct foreach work
  if (typeof options.where === 'string') {
    options.where = [options.where];
  }

  const page = options.page && options.page > 0 ? +options.page : defaultPage;

  const perPage = options.perPage && options.perPage > 0 ? +options.perPage : defaultPerPage;

  function getOrder(receivedOrder?: string[]) {
    if (!receivedOrder) return undefined;

    const order = {};

    receivedOrder.forEach((element) => {
      const split = element.split(':');
      order[split[0]] = split[1];
    });

    console.log(order);
    return order;
  }

  function getWhere(receivedWhere?: string[]) {
    if (!receivedWhere) return undefined;

    const where = {};

    receivedWhere.forEach((element) => {
      const split = element.split(':');
      where[split[0]] = ILike(`%${split[1]}%`);
    });

    return where;
  }

  const searchOption: FindConditions<T> | FindManyOptions<T> = {
    where: getWhere(options.where),
    order: getOrder(options.order),
  };

  const skip = (page - 1) * perPage;

  //Try to paginate with sort option, if the option given is incorrect return default pagination
  try {
    const [items, total] = await repository.findAndCount({ skip: skip, take: perPage, ...searchOption });

    const result: Page<T> = {
      content: JSON.parse(serialize(items)),
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: perPage,
        totalPages: Math.ceil(total / perPage),
        currentPage: total != 0 ? page : 0,
      },
    };

    return result;
  } catch (error) {
    throw new Error(`Error al obtener los resultados: ${error}`);
  }
}
