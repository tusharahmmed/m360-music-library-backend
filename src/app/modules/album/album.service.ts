/* eslint-disable no-unused-vars */
import { Album, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ALBUM_SEARCH_FIELDS } from './album.constant';
import { IAlbumFilters, ICreateAlbumPayload } from './album.interface';

// create new album
const createAlbum = async (payload: ICreateAlbumPayload) => {
  const { artists, genres, ...albumData } = payload;

  const newAlbum = await prisma.$transaction(async transcationClient => {
    const result = await transcationClient.album.create({
      data: albumData,
    });

    // insert artists to albumArtist
    await asyncForEach(artists, async (artistId: string) => {
      const createArtist = await transcationClient.albumArtist.create({
        data: {
          albumId: result.id,
          artistId,
        },
      });
    });

    // insert genres to albumGenre
    await asyncForEach(genres, async (genreId: string) => {
      const createGenre = await transcationClient.albumGenre.create({
        data: {
          albumId: result.id,
          genreId,
        },
      });
    });

    return result;
  });
  // response data
  if (newAlbum) {
    const responseData = await prisma.album.findUnique({
      where: {
        id: newAlbum.id,
      },
      include: {
        genre: { include: { genre: true } },
        artists: {
          include: { artist: true },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create album');
};

//get all albums
export const getAllAlbums = async (
  options: IPaginationOptions,
  filters: IAlbumFilters
): Promise<IGenericResponse<Album[]>> => {
  // paginations
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: ALBUM_SEARCH_FIELDS.map(field => {
        if (field === 'genre') {
          return {
            genre: {
              some: {
                genre: { title: { contains: searchTerm, mode: 'insensitive' } },
              },
            },
          };
        } else if (field === 'artist') {
          return {
            artists: {
              some: {
                artist: {
                  title: { contains: searchTerm, mode: 'insensitive' },
                },
              },
            },
          };
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          };
        }
      }),
    });
  }

  // generate filter condition
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AlbumWhereInput | any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.album.findMany({
    // filters
    where: whereConditions,

    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      genre: { include: { genre: true } },
      artists: {
        include: { artist: true },
      },
      songs: true,
    },
  });
  const total = await prisma.album.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single album by id
export const getSingleAlbum = async (id: string) => {
  const result = await prisma.album.findUnique({
    where: {
      id,
    },
    include: {
      genre: { include: { genre: true } },
      artists: {
        include: { artist: true },
      },
      songs: true,
    },
  });

  return result;
};

const deleteAlbum = async (id: string) => {
  const removedAlbum = await prisma.$transaction(async transcationClient => {
    const result = await transcationClient.album.delete({
      where: {
        id,
      },
      include: {
        genre: { include: { genre: true } },
        artists: {
          include: { artist: true },
        },
        songs: true,
      },
    });

    return result;
  });
  // response data
  if (removedAlbum) {
    return removedAlbum;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'unable to delete album');
};

const upDateAlbum = async (id: string, payload: ICreateAlbumPayload) => {
  const { artists, genres, ...albumData } = payload;

  const updatedAlubm = await prisma.$transaction(async transcationClient => {
    const result = await transcationClient.album.update({
      where: { id },
      data: albumData,
      include: {
        genre: { include: { genre: true } },
        artists: {
          include: { artist: true },
        },
      },
    });

    // remove previous artist & insert new
    if (artists && artists.length > 0) {
      await asyncForEach(result.artists, async (artistItem: any) => {
        const removeArtist = await transcationClient.albumArtist.deleteMany({
          where: {
            albumId: result.id,
            artistId: artistItem.artist.id,
          },
        });
      });
      await asyncForEach(artists, async (artistId: string) => {
        const createArtist = await transcationClient.albumArtist.create({
          data: {
            albumId: result.id,
            artistId,
          },
        });
      });
    }
    // remove previous genre and insert new
    if (genres && genres.length > 0) {
      await asyncForEach(result.genre, async (genreItem: any) => {
        const removeGenre = await transcationClient.albumGenre.deleteMany({
          where: {
            albumId: result.id,
            genreId: genreItem.genre.id,
          },
        });
      });
      await asyncForEach(genres, async (genreId: string) => {
        const createGenre = await transcationClient.albumGenre.create({
          data: {
            albumId: result.id,
            genreId,
          },
        });
      });
    }
    return result;
  });
  // response data
  if (updatedAlubm) {
    const responseData = await prisma.album.findUnique({
      where: {
        id: updatedAlubm.id,
      },
      include: {
        genre: { include: { genre: true } },
        artists: {
          include: { artist: true },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'unable to update album');
};

export const AlbumService = {
  createAlbum,
  getAllAlbums,
  getSingleAlbum,
  deleteAlbum,
  upDateAlbum,
};
