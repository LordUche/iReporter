"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Red Flag
 *
 * @export
 * @class RedFlag
 */
var RedFlag =
/**
 *Creates an instance of RedFlag.
 * @param {*} {
 *     createdBy,
 *     location,
 *     comment,
 *     Images = [],
 *     Videos = [],
 *     id = null,
 *     status = 'draft',
 *     createdOn = null,
 *   }
 * @memberof RedFlag
 */
function RedFlag(_ref) {
  var createdBy = _ref.createdBy,
      location = _ref.location,
      comment = _ref.comment,
      _ref$Images = _ref.Images,
      Images = _ref$Images === void 0 ? [] : _ref$Images,
      _ref$Videos = _ref.Videos,
      Videos = _ref$Videos === void 0 ? [] : _ref$Videos,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? null : _ref$id,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 'draft' : _ref$status,
      _ref$createdOn = _ref.createdOn,
      createdOn = _ref$createdOn === void 0 ? null : _ref$createdOn;

  _classCallCheck(this, RedFlag);

  this.id = id;
  this.type = 'red-flag';
  this.createdOn = createdOn;
  this.createdBy = createdBy;
  this.location = location;
  this.comment = comment;
  this.status = status;
  this.Images = Images;
  this.Videos = Videos;
};

exports.default = RedFlag;