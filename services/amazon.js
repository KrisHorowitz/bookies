var aws = require('../config');

var util = require('util'),
    OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId:     aws.aws.id,
    awsSecret: aws.aws.secret,
    assocId:   aws.aws.assoc,
    // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
    version:   '2013-08-01'
    // your version of using product advertising api, default: 2013-08-01
});

module.exports = {
  findBook: function (input, cb){
    // execute(operation, params, callback)
    // operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html
    // params: parameters for operation (optional)
    // callback(err, parsed, raw): callback function handling results. err = potential errors raised from xml2js.parseString() or http.request(). parsed = xml2js parsed response. raw = raw xml response.
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Books',
      'Keywords': input,
      'ResponseGroup': 'Small'
    }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
      if (err) console.error(err);
      var itemId = results.ItemSearchResponse.Items[0].Item[0].ASIN;
      opHelper.execute('ItemLookup', {
        'ItemId': itemId,
        'ResponseGroup': 'Images, ItemAttributes'
      }, function (err, results) {
        cb(err, results);
      });
    });
  }
};