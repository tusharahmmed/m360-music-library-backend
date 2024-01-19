import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LibraryController } from './library.controller';
import { LibraryValidation } from './library.validation';

const router = Router();

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  LibraryController.deleteLibraryItem
);

router.get(
  '/user/:userId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  LibraryController.getLibraryByUserId
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  LibraryController.getLibraryItemDetails
);

router.post(
  '/',
  validateRequest(LibraryValidation.createLibrary),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  LibraryController.insertIntoLibrary
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  LibraryController.getMyLibrary
);

export const LibraryRoutes = router;
