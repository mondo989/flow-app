#!/usr/bin/env node
var AWS = require('aws-sdk');

console.log("Uploading windows build...");
    AWS.config.region = 'us-west-1';

    AWS.config.update({
        accessKeyId:  "AKIAJVSGAOUL32MUL33A",
        secretAccessKey: "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",
        "region": "us-west-1"
    });

 var s3 = new AWS.S3();
 var params = {Bucket: 'asset-raw', Key: uri.substring(uri.lastIndexOf('/')+1)};
 var file = require('fs').createWriteStream(filename);

s3.getObject(params)

