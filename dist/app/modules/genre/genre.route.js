"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const genre_controller_1 = require("./genre.controller");
const genre_validation_1 = require("./genre.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(genre_validation_1.GenreValidation.createGenre), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), genre_controller_1.GenreController.insertIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), genre_controller_1.GenreController.deleteDocumentFromDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), genre_controller_1.GenreController.getAllDocumentsFromDb);
exports.GenreRoutes = router;
