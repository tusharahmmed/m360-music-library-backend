import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { LIBRARY_FILTERED_FIELDS } from './library.constant';
import { LibraryService } from './library.service';

const insertIntoLibrary = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user as JwtPayload;

  const result = await LibraryService.insertIntoLibrary(
    user.id as string,
    payload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Add to library successfully',
    data: result,
  });
});

const getMyLibrary = catchAsync(async (req, res) => {
  const user = req.user;
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, LIBRARY_FILTERED_FIELDS);

  const result = await LibraryService.getMyLibrary(
    user as JwtPayload,
    options,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'library retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getLibraryByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, LIBRARY_FILTERED_FIELDS);

  const result = await LibraryService.getLibraryByUserId(
    userId,
    options,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'library retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const getLibraryItemDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const result = await LibraryService.getLibraryItemDetails(
    id,
    user as JwtPayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'library item retrieved successfully',
    data: result,
  });
});

export const deleteLibraryItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const result = await LibraryService.deleteLibraryItem(id, user as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'library item deleted successfully',
    data: result,
  });
});

export const LibraryController = {
  insertIntoLibrary,
  getMyLibrary,
  getLibraryByUserId,
  getLibraryItemDetails,
  deleteLibraryItem,
};
