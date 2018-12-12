"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IncidentsQuery =
/*#__PURE__*/
function () {
  function IncidentsQuery() {
    _classCallCheck(this, IncidentsQuery);
  }

  _createClass(IncidentsQuery, null, [{
    key: "getAll",
    value: function getAll() {
      return _config.default.any('SELECT * FROM incidents WHERE type=$1', 'red-flag');
    }
  }, {
    key: "get",
    value: function get(id) {
      return _config.default.one('SELECT * FROM incidents WHERE type=$1 AND id=$2', ['red-flag', id]);
    }
  }, {
    key: "create",
    value: function create(data) {
      return _config.default.one('INSERT INTO incidents(type, comment, location, createdBy, Images, Videos) VALUES(${type}, ${comment}, ${location}, ${createdBy}, ${Images}, ${Videos}) RETURNING id', data);
    }
  }, {
    key: "updateComment",
    value: function updateComment(id, comment) {
      return _config.default.one('UPDATE incidents SET comment=$1 WHERE type=$2 AND id=$3', [comment, 'red-flag', id]);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return _config.default.one('DELETE FROM incidents WHERE type=$1 AND id=$2', ['redflag', id]);
    }
  }]);

  return IncidentsQuery;
}();

exports.default = IncidentsQuery;