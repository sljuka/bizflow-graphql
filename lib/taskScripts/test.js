'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _createProcess = require('../services/createProcess');

var _createProcess2 = _interopRequireDefault(_createProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var processMeta = require('../../processes/sample_process');

var Process = _db2.default.models.process;
(0, _createProcess2.default)(Process, processMeta).then(function () {
  return process.exit();
});