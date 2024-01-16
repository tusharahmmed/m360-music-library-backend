import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user';

const signup = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),

    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z
      .enum([...Object.values(ENUM_USER_ROLE)] as [string, ...string[]])
      .optional(),
  }),
});

const signin = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  signup,
  signin,
  refreshToken,
};
