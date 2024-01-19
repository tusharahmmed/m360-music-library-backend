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
exports.LibraryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const library_constant_1 = require("./library.constant");
const insertIntoLibrary = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // insert userid
    payload.userId = userId;
    // if song or album already exist
    const songOrAlbumCondition = payload.albumId
        ? { albumId: payload.albumId }
        : { songId: payload.songId };
    const exists = yield prisma_1.default.library.findFirst({
        where: {
            AND: [{ userId }, songOrAlbumCondition],
        },
    });
    if (exists) {
        throw new ApiError_1.default(http_status_1.default.UNPROCESSABLE_ENTITY, 'item already added');
    }
    const result = yield prisma_1.default.library.create({
        data: payload,
        include: {
            song: true,
            album: { include: { songs: true } },
        },
    });
    return result;
});
const getMyLibrary = (requestedUser, options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginatin
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters;
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: library_constant_1.LIBRARY_SEARCH_FIELDS.map(field => {
                if (field === 'album') {
                    return {
                        album: {
                            OR: [
                                { title: { contains: searchTerm, mode: 'insensitive' } },
                                {
                                    songs: {
                                        some: {
                                            title: { contains: searchTerm, mode: 'insensitive' },
                                        },
                                    },
                                },
                            ],
                        },
                    };
                }
                if (field === 'song') {
                    return {
                        song: { title: { contains: '', mode: 'insensitive' } },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0
        ? { AND: [{ userId: requestedUser.id }, ...andConditions] }
        : { userId: requestedUser.id };
    const result = yield prisma_1.default.library.findMany({
        // filters
        where: whereConditions,
        include: {
            user: { select: { name: true, email: true } },
            album: { include: { songs: true } },
            song: true,
        },
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.library.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getLibraryByUserId = (userId, options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginatin
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters;
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: library_constant_1.LIBRARY_SEARCH_FIELDS.map(field => {
                if (field === 'album') {
                    return {
                        album: {
                            OR: [
                                { title: { contains: searchTerm, mode: 'insensitive' } },
                                {
                                    songs: {
                                        some: {
                                            title: { contains: searchTerm, mode: 'insensitive' },
                                        },
                                    },
                                },
                            ],
                        },
                    };
                }
                if (field === 'song') {
                    return {
                        song: { title: { contains: '', mode: 'insensitive' } },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0
        ? { AND: [{ userId }, ...andConditions] }
        : { userId };
    const result = yield prisma_1.default.library.findMany({
        // filters
        where: whereConditions,
        include: {
            user: { select: { name: true, email: true } },
            album: { include: { songs: true } },
            song: true,
        },
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.library.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getLibraryItemDetails = (id, requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.library.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: { name: true, email: true },
            },
            album: { include: { songs: true } },
            song: true,
        },
    });
    // check same user || or super admin
    if (requestedUser.role !== user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        if ((result === null || result === void 0 ? void 0 : result.userId) !== requestedUser.id) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
    }
    return result;
});
const deleteLibraryItem = (id, requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const wantToDeleteItem = yield prisma_1.default.library.findUnique({
        where: {
            id,
        },
    });
    // check same user || or super admin
    if (requestedUser.role !== user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        if ((wantToDeleteItem === null || wantToDeleteItem === void 0 ? void 0 : wantToDeleteItem.userId) !== requestedUser.id) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
    }
    const result = yield prisma_1.default.library.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.LibraryService = {
    insertIntoLibrary,
    getMyLibrary,
    getLibraryByUserId,
    getLibraryItemDetails,
    deleteLibraryItem,
};
