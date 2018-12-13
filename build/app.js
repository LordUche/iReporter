"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));

if (process.env.NODE_ENV !== 'production') {
  app.use((0, _morgan.default)('dev'));
}

app.use('/api/v1', _routes.default);
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'That route does not exist on this server'
  });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port ".concat(process.env.PORT || 3000, "..."));
});
var _default = app;
exports.default = _default;