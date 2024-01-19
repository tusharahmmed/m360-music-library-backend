"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumValidation = void 0;
const zod_1 = require("zod");
const createAlbum = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        releaseYear: zod_1.z.string({ required_error: 'Release year is required' }),
        artists: zod_1.z
            .array(zod_1.z.string(), { required_error: 'Artists are required' })
            .nonempty(),
        genres: zod_1.z
            .array(zod_1.z.string(), { required_error: 'Genres are required' })
            .nonempty(),
    }),
});
const updateAlbum = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        releaseYear: zod_1.z.string().optional(),
        artists: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
        genres: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    }),
});
exports.AlbumValidation = {
    createAlbum,
    updateAlbum,
};
