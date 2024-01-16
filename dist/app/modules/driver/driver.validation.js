'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DriverRequestValidation = void 0;
const zod_1 = require('zod');
const user_1 = require('../../../enums/user');
const createRequest = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    serName: zod_1.z.string({ required_error: 'Ser Name is required' }),
    phone: zod_1.z.string({ required_error: 'Phone is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }),
    mcNumber: zod_1.z.string({ required_error: 'MC Number is required' }),
    loadDescription: zod_1.z.string({
      required_error: 'Load description is required',
    }),
    status: zod_1.z.enum([...user_1.ENUM_STATUS]).optional(),
  }),
});
const updateRequest = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    serName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    mcNumber: zod_1.z.string().optional(),
    loadDescription: zod_1.z.string().optional(),
    status: zod_1.z.enum([...user_1.ENUM_STATUS]).optional(),
  }),
});
exports.DriverRequestValidation = {
  createRequest,
  updateRequest,
};
