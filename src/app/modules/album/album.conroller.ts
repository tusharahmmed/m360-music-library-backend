import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ALBUM_FILTERED_FIELDS } from './album.constant';
import { AlbumService } from './album.service';

// create album
const createAlbum = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AlbumService.createAlbum(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'album created successfully',
    data: result,
  });
});

// getAllAlbums
const getAllAlbums = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, ALBUM_FILTERED_FIELDS);

  const result = await AlbumService.getAllAlbums(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Albums retrieved successfully',
    data: result,
  });
});

// create album
const getSingleAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlbumService.getSingleAlbum(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'album retrieved successfully',
    data: result,
  });
});
// delete album
const deleteAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlbumService.deleteAlbum(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'album deleted successfully',
    data: result,
  });
});

// create album
const upDateAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AlbumService.upDateAlbum(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'album updated successfully',
    data: result,
  });
});

export const AlbumController = {
  createAlbum,
  getAllAlbums,
  getSingleAlbum,
  deleteAlbum,
  upDateAlbum,
};
