var Sequelize = require('sequelize')
  , db        = require('../db')
;
// shelf
var Shelf = db.define('shelf', {
  material : {
    type : Sequelize.STRING,
    field_name: 'material'
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'shelf',
  classMethods: {
    associate: function(models) {
      var  Book = models.book
         , BookShelf = models.bookShelf
         , User      = models.user
      ;

      Shelf.belongsToMany(Book, {
        through: BookShelf,
        foreignKey: {
          name: 'shelf_id'
        }
      });

      Shelf.belongsTo(User, {
        foreignKey: {
          name: 'user_id'
        }
      });
    }
  }
});


module.exports = Shelf;