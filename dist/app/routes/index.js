"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const album_route_1 = require("../modules/album/album.route");
const artist_route_1 = require("../modules/artist/artist.route");
const auth_route_1 = require("../modules/auth/auth.route");
const genre_route_1 = require("../modules/genre/genre.route");
const library_route_1 = require("../modules/library/library.route");
const song_route_1 = require("../modules/song/song.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/genres',
        route: genre_route_1.GenreRoutes,
    },
    {
        path: '/artists',
        route: artist_route_1.ArtistRoutes,
    },
    {
        path: '/albums',
        route: album_route_1.AlbumRoutes,
    },
    {
        path: '/songs',
        route: song_route_1.SongRoutes,
    },
    {
        path: '/libraries',
        route: library_route_1.LibraryRoutes,
    },
];
moduleRoutes.forEach(module => router.use(module.path, module.route));
exports.applicationRoutes = router;
