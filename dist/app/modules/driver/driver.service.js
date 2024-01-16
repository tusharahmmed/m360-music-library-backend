"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRequestService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const driver_constant_1 = require("./driver.constant");
const insertIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driverRequest.create({
        data: payload,
    });
    return result;
});
// get all user
const getAllFrom = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginatin
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: driver_constant_1.DRIVER_REQUEST_SEARCH_FIELDS.map(field => {
                if (field !== 'status') {
                    return {
                        [field]: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    };
                }
                else {
                    let search;
                    if ('pending'.startsWith(searchTerm.toLowerCase())) {
                        search = 'pending';
                    }
                    if ('canceled'.startsWith(searchTerm.toLowerCase())) {
                        search = 'canceled';
                    }
                    if ('completed'.startsWith(searchTerm.toLowerCase())) {
                        search = 'completed';
                    }
                    return {
                        [field]: {
                            equals: search,
                        },
                    };
                }
            }),
        });
    }
    // generate filter condition
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.driverRequest.findMany({
        // filters
        where: whereConditions,
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.driverRequest.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driverRequest.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driverRequest.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driverRequest.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.DriverRequestService = {
    insertIntoDb,
    getAllFrom,
    getSingleItem,
    updateIntoDb,
    deleteFromDb,
};
