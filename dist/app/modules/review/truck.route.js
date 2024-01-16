'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require('express');
const user_1 = require('../../../enums/user');
const FileUploadHelper_1 = require('../../../helpers/FileUploadHelper');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const formDataValidation_1 = __importDefault(
  require('../../middlewares/formDataValidation')
);
const review_controller_1 = require('./review.controller');
const review_validation_1 = require('./review.validation');
const router = (0, express_1.Router)();
router.post(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  FileUploadHelper_1.FileUploadHelper.upload.single('file'),
  (0, formDataValidation_1.default)(
    review_validation_1.ReviewValidation.createReviewSchema,
    review_controller_1.ReviewController.insertIntoDb
  )
  // (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     req.body = TruckValidation.createTruckSchema.parse(
  //       JSON.parse(req.body?.data)
  //     );
  //     return TruckController.insertIntoDb(req, res, next);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
);
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  review_controller_1.ReviewController.getAllFromDb
);
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  review_controller_1.ReviewController.getSingeFromDb
);
router.patch(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  FileUploadHelper_1.FileUploadHelper.upload.single('file'),
  (0, formDataValidation_1.default)(
    review_validation_1.ReviewValidation.updateReviewSchema,
    review_controller_1.ReviewController.updateIntoDb
  )
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  review_controller_1.ReviewController.deleteFormDb
);
exports.ReviewRoutes = router;
