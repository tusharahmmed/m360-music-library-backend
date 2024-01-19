"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongValidation = void 0;
const zod_1 = require("zod");
const createSong = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        duration: zod_1.z.string({ required_error: 'Duration is required' }),
        albumId: zod_1.z.string({ required_error: 'Album id is required' }),
    }),
});
const updateSong = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        duration: zod_1.z.string().optional(),
        albumId: zod_1.z.string().optional(),
    }),
});
exports.SongValidation = {
    createSong,
    updateSong,
};
