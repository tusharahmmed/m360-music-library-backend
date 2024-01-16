'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const updateProfile = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    serName: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum([...Object.values(client_1.USER_ROLE)]).optional(),
    permissions: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    phone: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().optional(),
  }),
});
exports.ProfileValidation = {
  updateProfile,
};
