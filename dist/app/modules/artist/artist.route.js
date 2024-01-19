"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const artist_controller_1 = require("./artist.controller");
const artist_validation_1 = require("./artist.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(artist_validation_1.ArtistValidation.createArtist), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), artist_controller_1.AritstController.insertIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), artist_controller_1.AritstController.deleteDocumentFromDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), artist_controller_1.AritstController.getAllDocumentsFromDb);
exports.ArtistRoutes = router;
