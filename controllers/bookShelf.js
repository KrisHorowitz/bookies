var BookShelf = require('../models/bookShelf');

module.exports = {
  index: function(req, res) {
    BookShelf.findAll().then(function(bookshelves) {
      res.json(bookshelves);
    });
  }

};