"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryValidation = void 0;
const zod_1 = require("zod");
const createLibrary = zod_1.z.object({
    body: zod_1.z
        .object({
        albumId: zod_1.z.string(),
        songId: zod_1.z.string(),
    })
        .partial()
        .refine(data => data.albumId || data.songId, 'Either albumId or songId should be filled in.'),
});
exports.LibraryValidation = {
    createLibrary,
};
