'use strict';
/* eslint-disable @typescript-eslint/no-explicit-any */
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.hasTimeConflict = exports.asyncForEach = exports.excludeFields = void 0;
function excludeFields(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}
exports.excludeFields = excludeFields;
const asyncForEach = (arr, callback) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(arr)) {
      throw new Error('expected an array');
    }
    for (let i = 0; i < arr.length; i++) {
      yield callback(arr[i], i, arr);
    }
  });
exports.asyncForEach = asyncForEach;
const hasTimeConflict = (existingSlots, newSlot) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
exports.hasTimeConflict = hasTimeConflict;
