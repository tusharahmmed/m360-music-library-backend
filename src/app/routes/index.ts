import express from 'express';
import { AlbumRoutes } from '../modules/album/album.route';
import { ArtistRoutes } from '../modules/artist/artist.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { GenreRoutes } from '../modules/genre/genre.route';
import { LibraryRoutes } from '../modules/library/library.route';
import { SongRoutes } from '../modules/song/song.route';
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
  {
    path: '/albums',
    route: AlbumRoutes,
  },
  {
    path: '/songs',
    route: SongRoutes,
  },
  {
    path: '/libraries',
    route: LibraryRoutes,
  },
];

moduleRoutes.forEach(module => router.use(module.path, module.route));
export const applicationRoutes = router;
