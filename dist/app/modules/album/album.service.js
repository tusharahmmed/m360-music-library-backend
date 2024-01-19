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
exports.AlbumService = exports.getSingleAlbum = exports.getAllAlbums = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const album_constant_1 = require("./album.constant");
// create new album
const createAlbum = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { artists, genres } = payload, albumData = __rest(payload, ["artists", "genres"]);
    const newAlbum = yield prisma_1.default.$transaction((transcationClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transcationClient.album.create({
            data: albumData,
        });
        // insert artists to albumArtist
        yield (0, utils_1.asyncForEach)(artists, (artistId) => __awaiter(void 0, void 0, void 0, function* () {
            const createArtist = yield transcationClient.albumArtist.create({
                data: {
                    albumId: result.id,
                    artistId,
                },
            });
        }));
        // insert genres to albumGenre
        yield (0, utils_1.asyncForEach)(genres, (genreId) => __awaiter(void 0, void 0, void 0, function* () {
            const createGenre = yield transcationClient.albumGenre.create({
                data: {
                    albumId: result.id,
                    genreId,
                },
            });
        }));
        return result;
    }));
    // response data
    if (newAlbum) {
        const responseData = yield prisma_1.default.album.findUnique({
            where: {
                id: newAlbum.id,
            },
            include: {
                genre: { include: { genre: true } },
                artists: {
                    include: { artist: true },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unable to create album');
});
//get all albums
const getAllAlbums = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // paginations
    const { skip, page, limit, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // generate search condition
    if (searchTerm) {
        andConditions.push({
            OR: album_constant_1.ALBUM_SEARCH_FIELDS.map(field => {
                if (field === 'genre') {
                    return {
                        genre: {
                            some: {
                                genre: { title: { contains: searchTerm, mode: 'insensitive' } },
                            },
                        },
                    };
                }
                else if (field === 'artist') {
                    return {
                        artists: {
                            some: {
                                artist: {
                                    title: { contains: searchTerm, mode: 'insensitive' },
                                },
                            },
                        },
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
    const result = yield prisma_1.default.album.findMany({
        // filters
        where: whereConditions,
        //pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        include: {
            genre: { include: { genre: true } },
            artists: {
                include: { artist: true },
            },
            songs: true,
        },
    });
    const total = yield prisma_1.default.album.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.getAllAlbums = getAllAlbums;
// get single album by id
const getSingleAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.album.findUnique({
        where: {
            id,
        },
        include: {
            genre: { include: { genre: true } },
            artists: {
                include: { artist: true },
            },
            songs: true,
        },
    });
    return result;
});
exports.getSingleAlbum = getSingleAlbum;
const deleteAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const removedAlbum = yield prisma_1.default.$transaction((transcationClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transcationClient.album.delete({
            where: {
                id,
            },
            include: {
                genre: { include: { genre: true } },
                artists: {
                    include: { artist: true },
                },
                songs: true,
            },
        });
        return result;
    }));
    // response data
    if (removedAlbum) {
        return removedAlbum;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unable to delete album');
});
const upDateAlbum = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { artists, genres } = payload, albumData = __rest(payload, ["artists", "genres"]);
    const updatedAlubm = yield prisma_1.default.$transaction((transcationClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transcationClient.album.update({
            where: { id },
            data: albumData,
            include: {
                genre: { include: { genre: true } },
                artists: {
                    include: { artist: true },
                },
            },
        });
        // remove previous artist & insert new
        if (artists && artists.length > 0) {
            yield (0, utils_1.asyncForEach)(result.artists, (artistItem) => __awaiter(void 0, void 0, void 0, function* () {
                const removeArtist = yield transcationClient.albumArtist.deleteMany({
                    where: {
                        albumId: result.id,
                        artistId: artistItem.artist.id,
                    },
                });
            }));
            yield (0, utils_1.asyncForEach)(artists, (artistId) => __awaiter(void 0, void 0, void 0, function* () {
                const createArtist = yield transcationClient.albumArtist.create({
                    data: {
                        albumId: result.id,
                        artistId,
                    },
                });
            }));
        }
        // remove previous genre and insert new
        if (genres && genres.length > 0) {
            yield (0, utils_1.asyncForEach)(result.genre, (genreItem) => __awaiter(void 0, void 0, void 0, function* () {
                const removeGenre = yield transcationClient.albumGenre.deleteMany({
                    where: {
                        albumId: result.id,
                        genreId: genreItem.genre.id,
                    },
                });
            }));
            yield (0, utils_1.asyncForEach)(genres, (genreId) => __awaiter(void 0, void 0, void 0, function* () {
                const createGenre = yield transcationClient.albumGenre.create({
                    data: {
                        albumId: result.id,
                        genreId,
                    },
                });
            }));
        }
        return result;
    }));
    // response data
    if (updatedAlubm) {
        const responseData = yield prisma_1.default.album.findUnique({
            where: {
                id: updatedAlubm.id,
            },
            include: {
                genre: { include: { genre: true } },
                artists: {
                    include: { artist: true },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unable to update album');
});
exports.AlbumService = {
    createAlbum,
    getAllAlbums: exports.getAllAlbums,
    getSingleAlbum: exports.getSingleAlbum,
    deleteAlbum,
    upDateAlbum,
};
