import { z } from 'zod';

const createLibrary = z.object({
  body: z
    .object({
      albumId: z.string(),
      songId: z.string(),
    })
    .partial()
    .refine(
      data => data.albumId || data.songId,
      'Either albumId or songId should be filled in.'
    ),
});

export const LibraryValidation = {
  createLibrary,
};
