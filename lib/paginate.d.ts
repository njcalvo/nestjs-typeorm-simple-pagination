import { Repository } from 'typeorm';
import { IPaginationOptions, Page } from './interfaces';
export declare function paginate<T>(repository: Repository<T>, options: IPaginationOptions): Promise<Page<T>>;
//# sourceMappingURL=paginate.d.ts.map