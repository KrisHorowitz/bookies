module.exports=function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/detail', function(req, res) {
    res.render('detail.html');
  });
};

//tracking id bookies02-20
//Acess_key_id AKIAINTWLVNMQS3LKPFQ
//secret access key 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