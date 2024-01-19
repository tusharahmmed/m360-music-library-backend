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
exports.SongService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const song_constant_1 = require("./song.constant");
const createSong = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.create({
        data: payload,
        include: {
            album: {
                select: { title: true },
            },
        },
    });
    return result;
});
const getAllSongs = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginatin
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters;
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: song_constant_1.SONG_SEARCH_FIELDS.map(field => {
                if (field === 'album') {
                    return {
                        album: { title: { contains: searchTerm, mode: 'insensitive' } },
                    };
                }
                else {
                    return {
                        [field]: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.song.findMany({
        // filters
        where: whereConditions,
        include: {
            album: {
                select: { title: true },
            },
        },
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.song.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.findUnique({
        where: {
            id,
        },
        include: {
            album: {
                select: { title: true },
            },
        },
    });
    return result;
});
const deleteSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.delete({
        where: {
            id,
        },
        include: {
            album: {
                select: { title: true },
            },
        },
    });
    return result;
});
const updateSong = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.update({
        where: {
            id,
        },
        data: payload,
        include: {
            album: {
                select: { title: true },
            },
        },
    });
    return result;
});
exports.SongService = {
    createSong,
    getAllSongs,
    getSingleSong,
    deleteSong,
    updateSong,
};
