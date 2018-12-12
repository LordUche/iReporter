"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redFlags = _interopRequireDefault(require("../utils/database/red-flags.queries"));

var _redFlag = _interopRequireDefault(require("../models/red-flag.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RedFlagsController =
/*#__PURE__*/
function () {
  function RedFlagsController() {
    _classCallCheck(this, RedFlagsController);
  }

  _createClass(RedFlagsController, null, [{
    key: "index",
    value: function index(req, res) {
      return _redFlags.default.getAll().then(function (data) {
        res.status(200).json({
          status: 200,
          data: data
        });
      }).catch(function (err) {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
    }
  }, {
    key: "get",
    value: function get(req, res) {
      _redFlags.default.get(parseInt(req.params.id, 10)).then(function (data) {
        res.status(200).json({
          status: 200,
          data: [_objectSpread({}, data)]
        });
      }).catch(function (err) {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
          location = _req$body.location,
          comment = _req$body.comment,
          createdBy = _req$body.createdBy;

      try {
        if (!(location.trim() && comment.trim() && !isNaN(createdBy))) {
          return res.status(400).json({
            status: 400,
            error: 'Please provide at least the location, comment and createdBy id'
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide a string location and comment, and a valid user id for the createdBy field'
        });
      }

      return _redFlags.default.create(new _redFlag.default(req.body)).then(function (data) {
        res.status(201).json({
          status: 201,
          data: [_objectSpread({}, data, {
            message: 'Created red-flag record'
          })]
        });
      }).catch(function (err) {
        res.status(400).json({
          status: 400,
          error: err.message
        });
      });
    }
  }, {
    key: "updateLocation",
    value: function updateLocation(req, res) {
      var location = req.body.location;

      try {
        if (!location.trim()) {
          return res.status(400).json({
            status: 400,
            error: 'Location cannot be empty'
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide a location that has a string value'
        });
      }

      return _redFlags.default.updateLocation(parseInt(req.params.id, 10), location).then(function (data) {
        res.status(200).json({
          status: 200,
          data: [_objectSpread({}, data, {
            message: "Updated red-flag's location"
          })]
        });
      }).catch(function (err) {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
    }
  }, {
    key: "updateComment",
    value: function updateComment(req, res) {
      var comment = req.body.comment;

      try {
        if (!comment.trim()) {
          return res.status(400).json({
            status: 400,
            error: 'Comment cannot be empty'
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide a comment that has a string value'
        });
      }

      return _redFlags.default.updateComment(parseInt(req.params.id, 10), comment).then(function (data) {
        res.status(200).json({
          status: 200,
          data: [_objectSpread({}, data, {
            message: "Updated red-flag's comment"
          })]
        });
      }).catch(function (err) {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      return _redFlags.default.delete(parseInt(req.params.id, 10)).then(function (data) {
        res.status(200).json({
          status: 200,
          data: [_objectSpread({}, data, {
            message: 'Deleted red-flag record'
          })]
        });
      }).catch(function (err) {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
    }
  }]);

  return RedFlagsController;
}();

exports.default = RedFlagsController;