var mysql     = require('mysql');
var Sequelize = require('sequelize');
var sequelize = require('../db');
var models    = require('../models');

var controllers = {
  book: require('../controllers/book'),
  shelf: require('../controllers/shelf'),
  user: require('../controllers/user'),
  bookShelf: require('../controllers/bookShelf'),
  amazon: require('../controllers/amazon'),
  aws: require('../controllers/aws')
  //and so on....
};


module.exports=function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/detail', function(req, res) {
    res.render('detail.html');
  });
  app.get('/shelf-test', function(req, res) {
    res.render('shelf-test.html');
  });

  //book
  app.get('/book', controllers.book.index);
  app.get('/book/:id', controllers.book.show);
  app.post('/book', controllers.book.create);
  app.put('/book/:id', controllers.book.update);
  app.delete('/book/:id', controllers.book.remove);

  //shelf
  app.get('/shelf', controllers.shelf.index);
  app.get('/shelf/:id', controllers.shelf.show);
  app.post('/shelf/:id', controllers.shelf.create);
  app.put('/shelf/:id', controllers.shelf.update);
  app.delete('/shelf/:id', controllers.shelf.remove);
  app.get('/shelf/:id/book', controllers.shelf.getBooks);
  app.post('/shelf/:shelf_id/book/:book_id', controllers.shelf.addBook);
  app.delete('/shelf/:shelf_id/book/:book_id', controllers.shelf.removeBook);

  //user
  app.get('/user', controllers.user.getUsersByBook); // with query param
  app.get('/user/:id', controllers.user.show);
  app.get('/user/:id/shelf', controllers.user.getShelves);

  //bookshelf
  app.get('/bookshelf', controllers.bookShelf.index);

  //amazon API
  app.get('/amazon', controllers.amazon.index);
  app.get('/aws', controllers.aws.index);

  //CRUD + index
  /*
   * RESTful controllers have 5 methods:
   * index
   * create
   * show
   * update
   * remove
   */
};

//tracking id bookies02-20
//Acess_key_id AKIAINTWLVNMQS3LKPFQ
//secret access key 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