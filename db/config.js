var pgPromise = require('pg-promise');
var pgInstance = pgPromise();

var config = {
  host: 'localhost',
  port: 5432,
  database: 'be_rich',
  user: 'masarah'
}

var connection = pgInstance(process.env.DATABASE_URL || config);

module.exports = connection;