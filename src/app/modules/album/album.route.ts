import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AlbumController } from './album.conroller';
import { AlbumValidation } from './album.validation';

const router = Router();

router.patch(
  '/:id',
  validateRequest(AlbumValidation.updateAlbum),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AlbumController.upDateAlbum
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AlbumController.deleteAlbum
);

router.get('/:id', AlbumController.getSingleAlbum);

router.post(
  '/',
  validateRequest(AlbumValidation.createAlbum),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AlbumController.createAlbum
);

router.get('/', AlbumController.getAllAlbums);

export const AlbumRoutes = router;
