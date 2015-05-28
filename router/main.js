var mysql = require('mysql');

module.exports=function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/detail', function(req, res) {
    res.render('detail.html');
  });
  app.get('/book', function(req, res) {
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      database : 'books'
    });

    connection.connect();

    connection.query('SELECT * from book', function(err, rows, fields) {
      if (err) return res.json({success: false, error: err.getMessage() });

      res.json(rows);
    });

    connection.end();
  });
  app.get('/book/:id', function(req, res) {
    var id = req.params.id;
    // the connection code is duplicate and matches the above
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      database : 'books'
    });

    connection.connect();

    connection.query('SELECT * from book WHERE id=' + id, function(err, rows, fields) {
      if (err) return res.json({success: false, error: err.getMessage() });

      res.json(rows);
    });

    connection.end();
  });
  app.post('/book', function(req, res) {


    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      database : 'books'
    });

    connection.connect();

    connection.query('INSERT INTO book SET ?', {title: req.body.title,author: req.body.author}, function(err, result) {
      if (err) return res.json({success: false, error: err.getMessage() });
      console.log(result);
    });
    res.json(req.body);
  });

  app.put('/book/:id', function(req, res){
    var id = req.params.id;

    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      database : 'books'
    });

    connection.connect();

    connection.query('UPDATE book SET ? WHERE id=' + id, {title: req.body.title, author: req.body.author} ,function(err, rows, fields) {
      if (err) return res.json({success: false, error: err.getMessage() });

      res.json(req.body);
    });

    connection.end();
  });

  app.delete('/book/:id', function(req, res){
    var id = req.params.id;
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      database : 'books'
    });

    connection.connect();

    connection.query('DELETE from book WHERE id=' + id, function(err, rows, fields) {
      if (err) return res.json({success: false, error: err.getMessage() });

      res.json( req.body.title + ' has been deleted.');
    });

    connection.end();

  });


};

//tracking id bookies02-20
//Acess_key_id AKIAINTWLVNMQS3LKPFQ
//secret access key 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