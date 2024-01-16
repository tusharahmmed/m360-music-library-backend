'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DriverRoutes = void 0;
const express_1 = require('express');
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const driver_controller_1 = require('./driver.controller');
const driver_validation_1 = require('./driver.validation');
const router = (0, express_1.Router)();
router.post(
  '/',
  (0, validateRequest_1.default)(
    driver_validation_1.DriverRequestValidation.createRequest
  ),
  driver_controller_1.DriverRequestController.insertIntoDb
);
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  driver_controller_1.DriverRequestController.getAllFromDb
);
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  driver_controller_1.DriverRequestController.getSingleItem
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    driver_validation_1.DriverRequestValidation.updateRequest
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  driver_controller_1.DriverRequestController.updateIntoDb
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  driver_controller_1.DriverRequestController.deleteFromDb
);
exports.DriverRoutes = router;
