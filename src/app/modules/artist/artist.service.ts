import { Artist, Genre, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ARTIST_SEARCH_FIELDS } from './artist.constant';
import { IArtistFilters } from './artist.interface';

// inset document
const insertIntoDb = async (payload: Artist) => {
  const result = await prisma.artist.create({
    data: payload,
  });
  return result;
};

// get documents
const getAllDocumentsFromDb = async (
  options: IPaginationOptions,
  filters: IArtistFilters
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
      OR: ARTIST_SEARCH_FIELDS.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.ArtistWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.artist.findMany({
    // filters
    where: whereConditions,
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.artist.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// remove document
const deleteDocumentFromDb = async (id: string) => {
  const result = await prisma.artist.delete({
    where: { id },
  });

  return result;
};

export const ArtistService = {
  insertIntoDb,
  getAllDocumentsFromDb,
  deleteDocumentFromDb,
};
