import { Genre, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { GENRE_SEARCH_FIELDS } from './genre.constant';
import { IGenreFilters } from './genre.interface';

const insertIntoDb = async (payload: Genre) => {
  const result = await prisma.genre.create({
    data: payload,
  });
  return result;
};

const getAllDocumentsFromDb = async (
  options: IPaginationOptions,
  filters: IGenreFilters
): Promise<IGenericResponse<Genre[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: GENRE_SEARCH_FIELDS.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.GenreWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.genre.findMany({
    // filters
    where: whereConditions,
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.genre.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deleteDocumentFromDb = async (id: string) => {
  const result = await prisma.genre.delete({
    where: { id },
  });

  return result;
};

export const GenreService = {
  insertIntoDb,
  getAllDocumentsFromDb,
  deleteDocumentFromDb,
};
