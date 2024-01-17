import { Prisma, Song } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { SONG_SEARCH_FIELDS } from './song.constant';
import { ISongFilters } from './song.interface';

const createSong = async (payload: Song) => {
  const result = await prisma.song.create({
    data: payload,
    include: {
      album: {
        select: { title: true },
      },
    },
  });
  return result;
};

const getAllSongs = async (
  options: IPaginationOptions,
  filters: ISongFilters
): Promise<IGenericResponse<Song[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: SONG_SEARCH_FIELDS.map(field => {
        if (field === 'album') {
          return {
            album: { title: { contains: searchTerm, mode: 'insensitive' } },
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

  const whereConditions: Prisma.SongWhereInput | any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.song.findMany({
    // filters
    where: whereConditions,

    include: {
      album: {
        select: { title: true },
      },
    },
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.song.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleSong = async (id: string) => {
  const result = await prisma.song.findUnique({
    where: {
      id,
    },
    include: {
      album: {
        select: { title: true },
      },
    },
  });

  return result;
};

const deleteSong = async (id: string) => {
  const result = await prisma.song.delete({
    where: {
      id,
    },
    include: {
      album: {
        select: { title: true },
      },
    },
  });
  return result;
};

const updateSong = async (id: string, payload: Partial<Song>) => {
  const result = await prisma.song.update({
    where: {
      id,
    },
    data: payload,
    include: {
      album: {
        select: { title: true },
      },
    },
  });

  return result;
};

export const SongService = {
  createSong,
  getAllSongs,
  getSingleSong,
  deleteSong,
  updateSong,
};
