const Express = require('express');
const GraphHTTP = require('express-graphql');
const Schema = require('../schema');
const dataLoaders = require('../schema/dataLoaders');

const APP_PORT = 8000;

const app = Express();

app.use('/graphql', GraphHTTP({
  context: dataLoaders(),
  graphiql: true,
  pretty: true,
  schema: Schema
}));

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`); // eslint-disable-line no-console
});
