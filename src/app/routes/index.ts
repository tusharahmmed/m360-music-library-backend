import express from 'express';
import { ArtistRoutes } from '../modules/artist/artist.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { GenreRoutes } from '../modules/genre/genre.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/genres',
    route: GenreRoutes,
  },
  {
    path: '/artists',
    route: ArtistRoutes,
  },
];

moduleRoutes.forEach(module => router.use(module.path, module.route));
export const applicationRoutes = router;
