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
exports.ProfileService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
// get profile
const getProfile = (requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.id,
        },
    });
    const passwordRemoved = (0, utils_1.excludeFields)(result, ['password']);
    return passwordRemoved;
});
// update profile
const updateDocument = (id, user, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedUser = yield prisma_1.default.user.findUnique({
        where: {
            id: user.id,
        },
    });
    // check same user
    if (requestedUser && requestedUser.id !== id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden!');
    }
    // if has password
    if (payload === null || payload === void 0 ? void 0 : payload.password) {
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
    }
    // if has file
    if (file && !(requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.profileImage)) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (!uploadedImage) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.profileImage = uploadedImage.secure_url;
    }
    // if already uploaded then update image
    if (file && (requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.profileImage)) {
        const response = yield FileUploadHelper_1.FileUploadHelper.replaceImage(requestedUser.profileImage, file);
        if (!response) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.profileImage = response.secure_url;
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    const removedPassword = (0, utils_1.excludeFields)(result, ['password']);
    return removedPassword;
});
exports.ProfileService = {
    getProfile,
    updateDocument,
};
