"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const album_conroller_1 = require("./album.conroller");
const album_validation_1 = require("./album.validation");
const router = (0, express_1.Router)();
router.patch('/:id', (0, validateRequest_1.default)(album_validation_1.AlbumValidation.updateAlbum), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), album_conroller_1.AlbumController.upDateAlbum);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), album_conroller_1.AlbumController.deleteAlbum);
router.get('/:id', album_conroller_1.AlbumController.getSingleAlbum);
router.post('/', (0, validateRequest_1.default)(album_validation_1.AlbumValidation.createAlbum), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), album_conroller_1.AlbumController.createAlbum);
router.get('/', album_conroller_1.AlbumController.getAllAlbums);
exports.AlbumRoutes = router;
