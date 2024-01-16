'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.applicationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const auth_route_1 = require('../modules/auth/auth.route');
const customer_route_1 = require('../modules/customer/customer.route');
const driver_route_1 = require('../modules/driver/driver.route');
const profile_route_1 = require('../modules/profile/profile.route');
const quote_route_1 = require('../modules/quote/quote.route');
const truck_route_1 = require('../modules/review/truck.route');
const truck_route_2 = require('../modules/truck/truck.route');
const user_route_1 = require('../modules/user/user.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/profile',
    route: profile_route_1.ProfileRoutes,
  },
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/trucks',
    route: truck_route_2.TruckRoutes,
  },
  {
    path: '/quotes',
    route: quote_route_1.QuoteRoutes,
  },
  {
    path: '/drivers',
    route: driver_route_1.DriverRoutes,
  },
  {
    path: '/customers',
    route: customer_route_1.CustomerRoutes,
  },
  {
    path: '/reviews',
    route: truck_route_1.ReviewRoutes,
  },
];
moduleRoutes.forEach(module => router.use(module.path, module.route));
exports.applicationRoutes = router;
