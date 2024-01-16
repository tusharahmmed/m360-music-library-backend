import { z } from 'zod';

const createArtist = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

export const ArtistValidation = {
  createArtist,
};
