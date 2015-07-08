var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  //SQLite only
  //storage: 'path/to/database.sqlite'
});

module.exports = sequelize;
