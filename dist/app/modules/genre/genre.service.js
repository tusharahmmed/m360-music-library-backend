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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const genre_constant_1 = require("./genre.constant");
const insertIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.genre.create({
        data: payload,
    });
    return result;
});
const getAllDocumentsFromDb = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginatin
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters;
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: genre_constant_1.GENRE_SEARCH_FIELDS.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.genre.findMany({
        // filters
        where: whereConditions,
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.genre.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const deleteDocumentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.genre.delete({
        where: { id },
    });
    return result;
});
exports.GenreService = {
    insertIntoDb,
    getAllDocumentsFromDb,
    deleteDocumentFromDb,
};
