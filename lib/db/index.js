'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _defineModels = require('./defineModels');

var _defineModels2 = _interopRequireDefault(_defineModels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conn = new _sequelize2.default('relay', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
});

(0, _defineModels2.default)(Conn);

exports.default = Conn;