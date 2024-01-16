"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quote_controller_1 = require("./quote.controller");
const quote_validation_1 = require("./quote.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(quote_validation_1.QuoteValidation.createQuote), quote_controller_1.QuoteController.insertIntoDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), quote_controller_1.QuoteController.getAllFromDb);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), quote_controller_1.QuoteController.getSingleItem);
router.patch('/:id', (0, validateRequest_1.default)(quote_validation_1.QuoteValidation.updateQuote), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), quote_controller_1.QuoteController.updateIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), quote_controller_1.QuoteController.deleteFromDb);
exports.QuoteRoutes = router;
