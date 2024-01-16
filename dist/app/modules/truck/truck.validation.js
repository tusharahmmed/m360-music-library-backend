"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckValidation = void 0;
const zod_1 = require("zod");
const createTruckSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    description: zod_1.z.string({
        required_error: 'Content is required',
    }),
    pallets: zod_1.z.string({
        required_error: 'Pallets is required',
    }),
    weight: zod_1.z.string({
        required_error: 'Weight is required',
    }),
    doorSize: zod_1.z.string({
        required_error: 'Door size is required',
    }),
    cargoSpace: zod_1.z.string({
        required_error: 'Cargo space size is required',
    }),
});
const updateTruckSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    pallets: zod_1.z.string().optional(),
    weight: zod_1.z.string().optional(),
    doorSize: zod_1.z.string().optional(),
    cargoSpace: zod_1.z.string().optional(),
});
exports.TruckValidation = {
    createTruckSchema,
    updateTruckSchema,
};
