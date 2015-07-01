var Sequelize = require('sequelize')
  , db        = require('../db')
;

// book
var Book = db.define('book', {
  title : {
    type : Sequelize.STRING,
    field_name: 'title'
    },
  author : {
    type : Sequelize.STRING,
    field_name: 'author'
    },
  length : {
    type : Sequelize.DECIMAL,
    field_name: 'length'
    },
  width : {
    type: Sequelize.DECIMAL,
    field_name: 'width'
    },
  height : {
    type : Sequelize.DECIMAL,
    field_name: 'height'
    },
  cover_img : {
    type : Sequelize.STRING,
    field_name: 'cover_img'
    },
  back_img : {
    type: Sequelize.STRING,
    field_name: 'back_img'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'book',
    classMethods: {
      associate: function(models) {
        var Shelf = models.shelf
          , BookShelf = models.bookShelf
        ;

        Book.belongsToMany(Shelf, {
          through: BookShelf,
          foreignKey: {
            name: 'book_id'
          }
        });
      }
    }

  });


module.exports = Book;