import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ARTIST_FILTERED_FIELDS } from './artist.constant';
import { ArtistService } from './artist.service';

// crate document
const insertIntoDb = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ArtistService.insertIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'artist created successfully',
    data: result,
  });
});

// get all documents
const getAllDocumentsFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, ARTIST_FILTERED_FIELDS);

  const result = await ArtistService.getAllDocumentsFromDb(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'artist retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// delete a document by id
const deleteDocumentFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ArtistService.deleteDocumentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'artist deleted successfully',
    data: result,
  });
});

export const AritstController = {
  insertIntoDb,
  getAllDocumentsFromDb,
  deleteDocumentFromDb,
};
