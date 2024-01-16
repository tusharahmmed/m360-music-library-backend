'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require('zod');
const createReviewSchema = zod_1.z.object({
  name: zod_1.z.string({
    required_error: 'Name is required',
  }),
  description: zod_1.z.string({
    required_error: 'Description is required',
  }),
});
const updateReviewSchema = zod_1.z.object({
  name: zod_1.z.string().optional(),
  description: zod_1.z.string().optional(),
});
exports.ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};
