"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const song_controller_1 = require("./song.controller");
const song_validation_1 = require("./song.validation");
const router = (0, express_1.Router)();
router.patch('/:id', (0, validateRequest_1.default)(song_validation_1.SongValidation.updateSong), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), song_controller_1.SongController.updateSong);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), song_controller_1.SongController.deleteSong);
router.get('/:id', song_controller_1.SongController.getSingleSong);
router.post('/', (0, validateRequest_1.default)(song_validation_1.SongValidation.createSong), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), song_controller_1.SongController.createSong);
router.get('/', song_controller_1.SongController.getAllSongs);
exports.SongRoutes = router;
