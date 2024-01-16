"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUser = zod_1.z.object({
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
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        serName: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z
            .enum([...Object.values(client_1.USER_ROLE)])
            .optional(),
        permissions: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
        phone: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUser,
    updateUser,
};
