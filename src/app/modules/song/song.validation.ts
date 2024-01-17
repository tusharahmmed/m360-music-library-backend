import { z } from 'zod';

const createSong = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    duration: z.string({ required_error: 'Duration is required' }),
    albumId: z.string({ required_error: 'Album id is required' }),
  }),
});
const updateSong = z.object({
  body: z.object({
    title: z.string().optional(),
    duration: z.string().optional(),
    albumId: z.string().optional(),
  }),
});

export const SongValidation = {
  createSong,
  updateSong,
};
