import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AritstController } from './artist.controller';
import { ArtistValidation } from './artist.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ArtistValidation.createArtist),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AritstController.insertIntoDb
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AritstController.deleteDocumentFromDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AritstController.getAllDocumentsFromDb
);

export const ArtistRoutes = router;
