'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (DbConnnection) {
  return DbConnnection.define('post', {
    title: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    content: {
      type: _sequelize2.default.STRING,
      allowNull: false
    }
  });
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }