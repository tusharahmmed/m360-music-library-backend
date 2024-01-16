'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const FileUploadHelper_1 = require('../../../helpers/FileUploadHelper');
const auth_1 = __importDefault(require('../../middlewares/auth'));
// import validateRequest from '../../middlewares/validateRequest';
const profile_controller_1 = require('./profile.controller');
// import { ProfileValidation } from './profile.validation';
const router = (0, express_1.Router)();
router.patch(
  '/',
  // validateRequest(ProfileValidation.updateProfile),
  (0, auth_1.default)(
    client_1.USER_ROLE.admin,
    client_1.USER_ROLE.hr,
    client_1.USER_ROLE.super_admin
  ),
  FileUploadHelper_1.FileUploadHelper.upload.single('file'),
  profile_controller_1.ProfileController.updateDocument
);
router.get(
  '/',
  (0, auth_1.default)(
    client_1.USER_ROLE.admin,
    client_1.USER_ROLE.hr,
    client_1.USER_ROLE.super_admin
  ),
  profile_controller_1.ProfileController.getProfile
);
exports.ProfileRoutes = router;
