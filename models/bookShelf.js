var Sequelize = require('sequelize')
  , db        = require('../db');

// bookshelf
var BookShelf = db.define('bookshelf', {}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'book_shelf'
});

module.exports = BookShelf;