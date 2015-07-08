var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

// export AWS_ACCESS_KEY_ID=process.env.AWS_ID
// export AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET

var creds = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

// Create a bucket using bound parameters and put something in it.
// Make sure to change the bucket name from "myBucket" to something unique.
var s3bucket = new AWS.S3();

//pass it params

module.exports = {
  upload: function(path, img, cb){
    s3bucket.upload({Bucket: 'content.kris.life', Key: path, Body: img, ACL: 'public-read', ContentType: 'image/jpeg'}, cb);
  }
};

