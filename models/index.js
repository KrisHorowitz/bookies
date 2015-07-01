var bulk    = require('bulk-require')
   , models = bulk(__dirname, ['*.js'] )
;

Object.keys(models).forEach(function(key) {
  if(models[key].associate)
    models[key].associate(models);
});

module.exports = models;