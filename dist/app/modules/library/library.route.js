"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const library_controller_1 = require("./library.controller");
const library_validation_1 = require("./library.validation");
const router = (0, express_1.Router)();
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), library_controller_1.LibraryController.deleteLibraryItem);
router.get('/user/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), library_controller_1.LibraryController.getLibraryByUserId);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), library_controller_1.LibraryController.getLibraryItemDetails);
router.post('/', (0, validateRequest_1.default)(library_validation_1.LibraryValidation.createLibrary), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), library_controller_1.LibraryController.insertIntoLibrary);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), library_controller_1.LibraryController.getMyLibrary);
exports.LibraryRoutes = router;
