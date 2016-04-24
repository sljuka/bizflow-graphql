'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_lodash2.default.times(10, function () {
  return _db2.default.models.user.create({
    firstName: _faker2.default.name.firstName(),
    lastName: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email()
  }).then(function (person) {
    return person.createPost({
      title: 'Sample title by ' + person.firstName,
      content: 'This is a sample article'
    });
  }).then(function () {
    return process.exit();
  });
});