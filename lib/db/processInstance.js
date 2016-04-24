'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (DbConnnection) {
  return DbConnnection.define('processInstance', {
    name: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    description: {
      type: _sequelize2.default.STRING
    },
    additionalInfo: {
      type: _sequelize2.default.STRING
    },
    startedAt: {
      type: _sequelize2.default.DATE
    },
    finishedAt: {
      type: _sequelize2.default.DATE
    }
  });
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }