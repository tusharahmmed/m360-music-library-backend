import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { GenreController } from './genre.controller';
import { GenreValidation } from './genre.validation';

const router = Router();

router.post(
  '/',
  validateRequest(GenreValidation.createGenre),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  GenreController.insertIntoDb
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  GenreController.deleteDocumentFromDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  GenreController.getAllDocumentsFromDb
);

export const GenreRoutes = router;
