"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
var class_transformer_1 = require("class-transformer");
var typeorm_1 = require("typeorm");
function paginate(repository, options) {
    return __awaiter(this, void 0, void 0, function () {
        function getOrder(receivedOrder) {
            if (!receivedOrder)
                return undefined;
            var order = {};
            receivedOrder.forEach(function (element) {
                var split = element.split(':');
                order[split[0]] = split[1];
            });
            console.log(order);
            return order;
        }
        function getWhere(receivedWhere) {
            if (!receivedWhere)
                return undefined;
            var where = {};
            receivedWhere.forEach(function (element) {
                var split = element.split(':');
                where[split[0]] = typeorm_1.ILike("%" + split[1] + "%");
            });
            return where;
        }
        var defaultPage, defaultPerPage, page, perPage, searchOption, skip, _a, items, total, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    defaultPage = 1;
                    defaultPerPage = 3;
                    //If we receive just one order option, convert into string[] for correct foreach work
                    if (typeof options.order === 'string') {
                        options.order = [options.order];
                    }
                    //If we receive just one order option, convert into string[] for correct foreach work
                    if (typeof options.where === 'string') {
                        options.where = [options.where];
                    }
                    page = options.page && options.page > 0 ? +options.page : defaultPage;
                    perPage = options.perPage && options.perPage > 0 ? +options.perPage : defaultPerPage;
                    searchOption = {
                        where: getWhere(options.where),
                        order: getOrder(options.order),
                    };
                    skip = (page - 1) * perPage;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repository.findAndCount(__assign({ skip: skip, take: perPage }, searchOption))];
                case 2:
                    _a = _b.sent(), items = _a[0], total = _a[1];
                    result = {
                        content: JSON.parse(class_transformer_1.serialize(items)),
                        meta: {
                            itemCount: items.length,
                            totalItems: total,
                            itemsPerPage: perPage,
                            totalPages: Math.ceil(total / perPage),
                            currentPage: total != 0 ? page : 0,
                        },
                    };
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _b.sent();
                    throw new Error("Error al obtener los resultados: " + error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map