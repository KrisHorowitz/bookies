var Book = require('../models/book')
  , Amazon = require('../services/amazon')
  , AWS = require('../services/aws')
  , http = require('http')
  , fs = require('fs')
  , async = require('async')
  , path = require('path')
;


module.exports = {
  index: function(req, res) {
    Book.findAll().then(function(books){
      res.json(books);
    });
  }
  , show: function(req, res) {
    var id = req.params.id;
    Book.findAll({
      where : {
        id: id
      }
    }).then(function(book){
      res.json(book);
    });
  }
  , create: function(req, res) {

    async.waterfall([
      //Get Book Meta
      function(cb) {
         Amazon.findBook(req.body.title, function(err, books) {
            cb(err, books);
         });
      },
      //Get Cover Img
      function(books, cb) {
         var book = books.ItemLookupResponse.Items[0].Item[0];
         var title = book.ItemAttributes[0].Title[0];

         var back_img, front_img;

         http.get(book.LargeImage[0].URL[0], function(res){
            /*
            var imagedata = '';
            res.setEncoding('binary');
            res.on('data', function(chunk){
              imagedata += chunk;
            });
            res.on('end', function(){
            */
              var _path = title + '-cover.jpg';
              console.log('Saving File To', _path);
              front_img = '//content.kris.life/' + title + '-cover.jpg';

              AWS.upload(_path, res, function(err, data) {
                  console.log(err, data);
                  if (err) cb(err);
                  if (back_img && front_img) {
                    cb(null, book, front_img, back_img);
                  }
                });
              /*
            });
*/
          });


          http.get(book.ImageSets[0].ImageSet[0].LargeImage[0].URL[0], function(res){
            /*
            var imagedata = '';
            res.setEncoding('binary');

            res.on('data', function(chunk){
              imagedata += chunk;
            });
            res.on('end', function(){
            */
              var _path = title + '-back.jpg';
              console.log('Saving File To', _path);
              back_img = '//content.kris.life/' + title + '-back.jpg';

              AWS.upload(_path, res, function(err, data) {
                  console.log(err, data);
                  if (err) cb(err);
                  if (back_img && front_img) {
                    cb(null, book, front_img, back_img);
                  }
                });
              /*
            });
*/
          });


      },
      // get back img

      //Store the book
      function(book, cover_img_url, back_img_url, cb) {
        var bookDim = [];
        var itemDim = book.ItemAttributes[0].ItemDimensions[0];
        bookDim.push(parseInt(itemDim.Length[0]._, 10), parseInt(itemDim.Width[0]._, 10), parseInt(itemDim.Height[0]._, 10));
        if (itemDim.Length[0].$.Units === 'hundredths-inches') {
          for (var i = 0; i < bookDim.length; i++) {
            bookDim[i] = bookDim[i] / 100;
          }
        }
        bookDim = bookDim.sort();
        Book.sync().then(function () {
          var bookObj = {
            title     : book.ItemAttributes[0].Title[0],
            author    : book.ItemAttributes[0].Author[0],
            length    : (bookDim[1]),
            width     : (bookDim[0]),
            height    : (bookDim[2]),
            cover_img : cover_img_url, //book.LargeImage[0].URL[0],
            back_img  : back_img_url//book.ImageSets[0].ImageSet[0].LargeImage[0].URL[0]
          };

          Book.create(bookObj).then(function(book){
            cb(null, book);
          });
        });
      },

      //Send response
      function(book, cb) {
        res.json(book);
        cb();
      }
    ]);
  }
  , update: function(req, res) {
    var id = req.params.id;
    var bookObj = {
      title : req.body.title,
      author : req.body.author,
      length : req.body.length,
      width : req.body.width,
      height : req.body.height,
      cover_img: req.body.cover_img,
      back_img: req.body.back_img
    };
    Book.update(bookObj, {
      where: {
        id : id
      }
    }).then(function(){
      bookObj.id = id;
      res.json(bookObj);
    });
  }

  , remove: function(req, res) {
    var id = req.params.id;
    Book.destroy({
      where : {
        id : id
      }
    }).then(function(){
      res.json('Book ' + id + ' has been deleted');
    });

  }
};