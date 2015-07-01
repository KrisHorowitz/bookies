/*global __dirname, describe, before, after,it*/
var http = require('http'),
assert = require('assert'),
rest = require('restler');

var app  = require(__dirname + '/../app');
var port = 3333;
var url  = 'http://localhost:'+port;
var sessionCookie = null;
var server;

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}

function defaultPostOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "POST",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}

describe('book', function() {
  before(function(done) {
    server = app.listen(port, function(err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after(function (done) {
    server.close();
    done();
  });

  it('should be listening at localhost:3333', function(done) {
    var headers = defaultGetOptions('/');
    http.get(headers, function(res) {
      assert.equal(res.statusCode, 200, 'Server not up');
      done();
    });
  });

  it('should be able to be created', function(done) {
    var headers = defaultPostOptions('/book');

    // http.get(headers, function(res) {
    //   assert.equal(res.statusCode, 200, 'Server not up');
    //   console.log(res);
    //   done();
    var book = {
      title: "My book2",
      author: "me2"
    };
    rest.postJson(url + '/book', book).on('complete', function(data, response){
      // assert.equal(response.statusCode, 200, 'Server not up');
      var id = data.id;
      rest.get(url + '/book/' + id, function(data, response){
        assert.equal(response.statusCode, 200, 'Book does not exist');
        assert.equal(id, data.id, 'ID does not match');
        assert.equal(book.title, data.title,  'Title does not match');
      });
      done();
    });
      // var book_id = res.body.insertId;
      //get the id of the book that was created
      // http.get(defaultGetOptions('/book/'+book_id), function(res) {
      //   assert.equal(res.statusCode, 200, 'Server not up');
      //   // console.log(res.body);
      //   done();
          //assert that the book that was created exists and the properties are
          //equal to the properties supplied.
      // });

      // rest.get('/book/' + id).on('commplete', function(result) {
      //   assert.equal(result.statusCode, )
      // })
    // });
  });


});