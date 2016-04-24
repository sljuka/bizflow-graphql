'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_PORT = 3000;

var app = (0, _express2.default)();

app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, function () {
  console.log('App listening on port ' + APP_PORT); // eslint-disable-line no-console
});

// ./node_modules/babel-cli/bin/babel-node.js server.js