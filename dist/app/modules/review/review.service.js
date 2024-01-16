"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'image is required');
    }
    // if has file
    if (file) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (!uploadedImage) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.image = uploadedImage.secure_url;
    }
    const result = yield prisma_1.default.review.create({
        data: payload,
    });
    return result;
});
const getAllFromDb = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.review.findMany({
        // pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.review.count();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingeFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDb = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existingReview = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
    });
    // if has file
    if (file && !(existingReview === null || existingReview === void 0 ? void 0 : existingReview.image)) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (!uploadedImage) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.image = uploadedImage.secure_url;
    }
    // if already uploaded then update image
    if (file && (existingReview === null || existingReview === void 0 ? void 0 : existingReview.image)) {
        const response = yield FileUploadHelper_1.FileUploadHelper.replaceImage(existingReview.image, file);
        if (!response) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.image = response.secure_url;
    }
    const result = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFormDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ReviewService = {
    insertIntoDb,
    getAllFromDb,
    getSingeFromDb,
    updateIntoDb,
    deleteFormDb,
};
