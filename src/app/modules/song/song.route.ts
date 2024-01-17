import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SongController } from './song.controller';
import { SongValidation } from './song.validation';

const router = Router();

router.patch(
  '/:id',
  validateRequest(SongValidation.updateSong),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SongController.updateSong
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SongController.deleteSong
);

router.get('/:id', SongController.getSingleSong);

router.post(
  '/',
  validateRequest(SongValidation.createSong),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SongController.createSong
);

router.get('/', SongController.getAllSongs);

export const SongRoutes = router;
