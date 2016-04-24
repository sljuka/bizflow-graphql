'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Conn) {
  return Conn.define('user', {
    firstName: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    lastName: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    email: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }