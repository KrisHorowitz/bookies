var User = require('../models/user'),
  Shelf  = require('../models/shelf'),
  Book   = require('../models/book');

module.exports = {
  show: function(req, res) {
    var id = req.params.id;
    User.findAll({
      where : {
        id: id
      }
    }).then(function(user){
      res.json(user);
    });
  }
  // list all shelves under a user
  , getShelves: function(req, res) {
    var id = req.params.id;

    User.findById(id).then(function(user) {
      user.getShelves().then(function(shelves) {
        res.json(shelves);
      });
    });
  }
  //show all users who have a given book_id on their shelf
  , getUsersByBook: function(req, res) {
    var book_id = req.query.book;
    User.findAll({
      include : [{
        model: Shelf,
        include: [{
           model: Book,
           where: {
              id: book_id
           }
        }]
      }]
    }).then(function(users){
      users = users.map(function(user) {
          delete user.dataValues.shelves;
          return user.dataValues;
      });
      res.json(users);
    });
  }
};