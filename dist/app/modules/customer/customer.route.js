"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_controller_1 = require("./customer.controller");
const customer_validation_1 = require("./customer.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(customer_validation_1.CustomerRequestValidation.createRequest), customer_controller_1.CustomerRequestController.insertIntoDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerRequestController.getAllFromDb);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerRequestController.getSingleItem);
router.patch('/:id', (0, validateRequest_1.default)(customer_validation_1.CustomerRequestValidation.updateRequest), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerRequestController.updateIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), customer_controller_1.CustomerRequestController.deleteFromDb);
exports.CustomerRoutes = router;
