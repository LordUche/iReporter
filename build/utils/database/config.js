"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _pgPromise = _interopRequireDefault(require("pg-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var pg = (0, _pgPromise.default)({
  promiseLib: _bluebird.default
});
var config = {
  host: 'localhost',
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  database: 'ireporter'
};
var db = pg(process.env.DATABASE_URL || config);
var _default = db;
exports.default = _default;