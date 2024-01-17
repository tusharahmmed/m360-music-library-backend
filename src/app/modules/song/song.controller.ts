import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SONG_FILTERED_FIELDS } from './song.constant';
import { SongService } from './song.service';

const createSong = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await SongService.createSong(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'song created successfully',
    data: result,
  });
});

const getAllSongs = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, SONG_FILTERED_FIELDS);

  const result = await SongService.getAllSongs(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'songs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSong = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SongService.getSingleSong(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'song retrieved successfully',
    data: result,
  });
});
const deleteSong = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SongService.deleteSong(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'song deleted successfully',
    data: result,
  });
});
const updateSong = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SongService.updateSong(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'song updated successfully',
    data: result,
  });
});

export const SongController = {
  createSong,
  getAllSongs,
  getSingleSong,
  deleteSong,
  updateSong,
};
