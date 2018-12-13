"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _redFlags = _interopRequireDefault(require("../controllers/red-flags.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();
router.get('/red-flags', _redFlags.default.index);
router.get('/red-flags/:id(\\d+)', _redFlags.default.get);
router.post('/red-flags', _redFlags.default.create);
router.patch('/red-flags/:id(\\d+)/location', _redFlags.default.updateLocation);
router.patch('/red-flags/:id(\\d+)/comment', _redFlags.default.updateComment);
router.delete('/red-flags/:id(\\d+)', _redFlags.default.delete);
var _default = router;
exports.default = _default;