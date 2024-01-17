import { z } from 'zod';

const createAlbum = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    releaseYear: z.string({ required_error: 'Release year is required' }),
    artists: z
      .array(z.string(), { required_error: 'Artists are required' })
      .nonempty(),
    genres: z
      .array(z.string(), { required_error: 'Genres are required' })
      .nonempty(),
  }),
});

const updateAlbum = z.object({
  body: z.object({
    title: z.string().optional(),
    releaseYear: z.string().optional(),
    artists: z.array(z.string()).nonempty().optional(),
    genres: z.array(z.string()).nonempty().optional(),
  }),
});
export const AlbumValidation = {
  createAlbum,
  updateAlbum,
};
