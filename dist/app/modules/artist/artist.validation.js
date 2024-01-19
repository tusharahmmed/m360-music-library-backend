"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistValidation = void 0;
const zod_1 = require("zod");
const createArtist = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
    }),
});
exports.ArtistValidation = {
    createArtist,
};
