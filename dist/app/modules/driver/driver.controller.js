'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DriverRequestController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const driver_constant_1 = require('./driver.constant');
const driver_service_1 = require('./driver.service');
const insertIntoDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield driver_service_1.DriverRequestService.insertIntoDb(
      payload
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Request submitted successfully',
      data: result,
    });
  })
);
// get all users
const getAllFromDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.PAGINATION_FIELDS
    );
    const filters = (0, pick_1.default)(
      req.query,
      driver_constant_1.DRIVER_REQUEST_FILTERED_FIELDS
    );
    const result = yield driver_service_1.DriverRequestService.getAllFrom(
      options,
      filters
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Requests retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleItem = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield driver_service_1.DriverRequestService.getSingleItem(
      id
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Request fetched successfully',
      data: result,
    });
  })
);
const updateIntoDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield driver_service_1.DriverRequestService.updateIntoDb(
      id,
      payload
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Request updated successfully',
      data: result,
    });
  })
);
const deleteFromDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield driver_service_1.DriverRequestService.deleteFromDb(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Request deleted successfully',
      data: result,
    });
  })
);
exports.DriverRequestController = {
  insertIntoDb,
  getAllFromDb,
  getSingleItem,
  updateIntoDb,
  deleteFromDb,
};
