var app =require('./app');

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function() {
  console.log("Server started on port" + (process.env.PORT || 5000));
});

