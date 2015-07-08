var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

// export AWS_ACCESS_KEY_ID=process.env.AWS_ID
// export AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET

var creds = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

// Create a bucket using bound parameters and put something in it.
// Make sure to change the bucket name from "myBucket" to something unique.
var s3bucket = new AWS.S3();
var params = {Bucket: 'book-img', Key: 'myKey'};

//pass it params

module.exports = {
  index: function(){
    s3bucket.upload({Bucket: 'book-img', Key: 'myKey', Body: 'Hello!'}, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to book-img/myKey");
      }
    });
  }
};

