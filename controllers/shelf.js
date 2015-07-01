var Shelf = require('../models/shelf'),
Book      = require('../models/book'),
BookShelf = require('../models/bookShelf');

module.exports = {
  index: function(req, res) {
    Shelf.findAll().then(function(shelves) {
      res.json(shelves);
    });
  }
  , show: function(req, res) {
    var id = req.params.id;
    Shelf.findAll({
      where : {
        id: id
      }
    }).then(function(shelf){
      res.json(shelf);
    });
  }
  , create: function(req, res) {
    Shelf.sync().then(function () {
      var shelfObj = {
        user_id : req.body.user_id,
        material : req.body.material
      };
        return Shelf.create(shelfObj);
      }).then(function(shelf) {
        //success
        res.json(shelf);
      }, function(err) {
        console.error(err);
    });
  }
  , update: function(req, res) {
    var id = req.params.id;
    var shelfObj = {
      user_id : req.body.user_id,
      material : req.body.material
    };
    Shelf.update(shelfObj, {
      where: {
        id : id
      }
    }).then(function(){
      shelfObj.id = id;
      res.json(shelfObj);
    });
  }
  , remove: function(req, res) {
    var id = req.params.id;
    Shelf.destroy({
      where : {
        id : id
      }
    }).then(function(){
      res.json('Shelf ' + id + ' has been deleted');
    });
  }
  // get books on a shelf
  , getBooks: function(req, res) {
    var id = req.params.id;
    Shelf.findOne({
       where: {
          id: id
       }
       , include: [Book]
    }).then(function(shelf) {
       res.json(shelf.books);
    });
  }
  // add books to a shelf
  , addBook: function(req, res) {
    BookShelf.sync().then(function () {
    var bookShelfObj = {
      shelf_id : req.params.shelf_id,
      book_id : req.params.book_id
    };
      return BookShelf.create(bookShelfObj);
    }).then(function(bookShelf) {
        //success
        res.json(bookShelf);
    }, function(err) {
        console.error(err);
    });
  }
  // remove books from a shelf
  , removeBook: function(req, res) {
    var shelf_id = req.params.shelf_id,
    book_id = req.params.book_id;
    BookShelf.destroy({
      where : {
        shelf_id : shelf_id,
        book_id : book_id
      }
    }).then(function(){
      res.json('Book ' + book_id + ' has been removed from shelf '+ shelf_id );
    });
  }

};