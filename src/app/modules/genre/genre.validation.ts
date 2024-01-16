import { z } from 'zod';

const createGenre = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

export const GenreValidation = {
  createGenre,
};
