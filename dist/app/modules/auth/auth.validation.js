'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const signup = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }),
    serName: zod_1.z.string({ required_error: 'Ser Name is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    role: zod_1.z.enum([...Object.values(client_1.USER_ROLE)], {
      required_error: 'Role is required',
    }),
    permissions: zod_1.z
      .array(zod_1.z.string(), { required_error: 'Permissions is required' })
      .nonempty(),
    phone: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().optional(),
  }),
});
const signin = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string({ required_error: 'email is required' }),
    password: zod_1.z.string({ required_error: 'password is required' }),
  }),
});
const refreshToken = zod_1.z.object({
  cookies: zod_1.z.object({
    refreshToken: zod_1.z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});
exports.AuthValidation = {
  signup,
  signin,
  refreshToken,
};
