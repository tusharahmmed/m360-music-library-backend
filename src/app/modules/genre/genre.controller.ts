import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { GENRE_FILTERED_FIELDS } from './genre.constant';
import { GenreService } from './genre.service';

// crate document
const insertIntoDb = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await GenreService.insertIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'genre created successfully',
    data: result,
  });
});

// get all documents
const getAllDocumentsFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, GENRE_FILTERED_FIELDS);

  const result = await GenreService.getAllDocumentsFromDb(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'genre retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// delete a document by id
const deleteDocumentFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await GenreService.deleteDocumentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'genre deleted successfully',
    data: result,
  });
});

export const GenreController = {
  insertIntoDb,
  getAllDocumentsFromDb,
  deleteDocumentFromDb,
};
