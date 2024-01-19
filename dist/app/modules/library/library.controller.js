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
exports.LibraryController = exports.deleteLibraryItem = exports.getLibraryItemDetails = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const library_constant_1 = require("./library.constant");
const library_service_1 = require("./library.service");
const insertIntoLibrary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user;
    const result = yield library_service_1.LibraryService.insertIntoLibrary(user.id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Add to library successfully',
        data: result,
    });
}));
const getMyLibrary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const options = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const filters = (0, pick_1.default)(req.query, library_constant_1.LIBRARY_FILTERED_FIELDS);
    const result = yield library_service_1.LibraryService.getMyLibrary(user, options, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'library retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getLibraryByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const options = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const filters = (0, pick_1.default)(req.query, library_constant_1.LIBRARY_FILTERED_FIELDS);
    const result = yield library_service_1.LibraryService.getLibraryByUserId(userId, options, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'library retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.getLibraryItemDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const result = yield library_service_1.LibraryService.getLibraryItemDetails(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'library item retrieved successfully',
        data: result,
    });
}));
exports.deleteLibraryItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const result = yield library_service_1.LibraryService.deleteLibraryItem(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'library item deleted successfully',
        data: result,
    });
}));
exports.LibraryController = {
    insertIntoLibrary,
    getMyLibrary,
    getLibraryByUserId,
    getLibraryItemDetails: exports.getLibraryItemDetails,
    deleteLibraryItem: exports.deleteLibraryItem,
};
