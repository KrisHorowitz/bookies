var Sequelize = require('sequelize')
  , db        = require('../db')
  , Shelf     = require('./shelf');

// user
var User = db.define('user', {
  email : {
    type: Sequelize.STRING,
    field_name: 'email'
  },
  username : {
    type: Sequelize.STRING,
    field_name: 'username'
  }
},{
  timestamps: false,
  freezeTableName: true,
  tableName: 'user',
  classMethods: {
    associate: function(models) {
      var Shelf = models.shelf;
      User.hasMany(Shelf, {
        foreignKey: {
          name: 'user_id'
        }
      });
    }
  }
});

// 1:m
// User.hasMany(Shelf, {
//   foreignKey: {
//     name: 'user_id'
//   }
// });

module.exports = User;