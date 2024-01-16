'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QuoteValidation = void 0;
const zod_1 = require('zod');
const user_1 = require('../../../enums/user');
const createQuote = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    serName: zod_1.z.string({ required_error: 'Ser Name is required' }),
    phone: zod_1.z.string({ required_error: 'Phone is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }),
    pickupZip: zod_1.z.string({ required_error: 'Pickup Zip is required' }),
    deliveryZip: zod_1.z.string({ required_error: 'Delivery Zip is required' }),
    totalPices: zod_1.z.string({ required_error: 'Total pices is required' }),
    totalWeight: zod_1.z.number({ required_error: 'Total weight is required' }),
    question: zod_1.z.string({ required_error: 'Question is required' }),
    status: zod_1.z.enum([...user_1.ENUM_STATUS]).optional(),
  }),
});
const updateQuote = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    serName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    pickupZip: zod_1.z.string().optional(),
    deliveryZip: zod_1.z.string().optional(),
    totalPices: zod_1.z.string().optional(),
    totalWeight: zod_1.z.number().optional(),
    question: zod_1.z.string().optional(),
    status: zod_1.z.enum([...user_1.ENUM_STATUS]).optional(),
  }),
});
exports.QuoteValidation = {
  createQuote,
  updateQuote,
};
