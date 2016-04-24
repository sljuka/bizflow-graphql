'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (DbConnnection) {
  return DbConnnection.define('nextAction', {
    key: {
      type: _sequelize2.default.STRING
    }
  });
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }