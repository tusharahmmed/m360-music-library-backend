import { Library, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { LIBRARY_SEARCH_FIELDS } from './library.constant';
import { ILibraryFilters } from './library.interface';

const insertIntoLibrary = async (userId: string, payload: Library) => {
  // insert userid
  payload.userId = userId;

  // if song or album already exist
  const songOrAlbumCondition = payload.albumId
    ? { albumId: payload.albumId }
    : { songId: payload.songId };

  const exists = await prisma.library.findFirst({
    where: {
      AND: [{ userId }, songOrAlbumCondition],
    },
  });

  if (exists) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'item already added');
  }

  const result = await prisma.library.create({
    data: payload,
    include: {
      song: true,
      album: { include: { songs: true } },
    },
  });
  return result;
};

const getMyLibrary = async (
  requestedUser: JwtPayload,
  options: IPaginationOptions,
  filters: ILibraryFilters
): Promise<IGenericResponse<Library[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: LIBRARY_SEARCH_FIELDS.map(field => {
        if (field === 'album') {
          return {
            album: {
              OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                {
                  songs: {
                    some: {
                      title: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
              ],
            },
          };
        }
        if (field === 'song') {
          return {
            song: { title: { contains: '', mode: 'insensitive' } },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.LibraryWhereInput | any =
    andConditions.length > 0
      ? { AND: [{ userId: requestedUser.id }, ...andConditions] }
      : { userId: requestedUser.id };

  const result = await prisma.library.findMany({
    // filters
    where: whereConditions,

    include: {
      user: { select: { name: true, email: true } },
      album: { include: { songs: true } },
      song: true,
    },
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.library.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getLibraryByUserId = async (
  userId: string,
  options: IPaginationOptions,
  filters: ILibraryFilters
): Promise<IGenericResponse<Library[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: LIBRARY_SEARCH_FIELDS.map(field => {
        if (field === 'album') {
          return {
            album: {
              OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                {
                  songs: {
                    some: {
                      title: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
              ],
            },
          };
        }
        if (field === 'song') {
          return {
            song: { title: { contains: '', mode: 'insensitive' } },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.LibraryWhereInput | any =
    andConditions.length > 0
      ? { AND: [{ userId }, ...andConditions] }
      : { userId };

  const result = await prisma.library.findMany({
    // filters
    where: whereConditions,

    include: {
      user: { select: { name: true, email: true } },
      album: { include: { songs: true } },
      song: true,
    },
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.library.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getLibraryItemDetails = async (id: string, requestedUser: JwtPayload) => {
  const result = await prisma.library.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
      album: { include: { songs: true } },
      song: true,
    },
  });

  // check same user || or super admin
  if (requestedUser.role !== ENUM_USER_ROLE.SUPER_ADMIN) {
    if (result?.userId !== requestedUser.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }
  return result;
};

const deleteLibraryItem = async (id: string, requestedUser: JwtPayload) => {
  const wantToDeleteItem = await prisma.library.findUnique({
    where: {
      id,
    },
  });

  // check same user || or super admin
  if (requestedUser.role !== ENUM_USER_ROLE.SUPER_ADMIN) {
    if (wantToDeleteItem?.userId !== requestedUser.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  const result = await prisma.library.delete({
    where: {
      id,
    },
  });
  return result;
};

export const LibraryService = {
  insertIntoLibrary,
  getMyLibrary,
  getLibraryByUserId,
  getLibraryItemDetails,
  deleteLibraryItem,
};
