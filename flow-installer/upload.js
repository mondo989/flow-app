#!/usr/bin/env node
var os = require("os");
var AWS = require('aws-sdk');

console.log("Uploading windows build...");
AWS.config.region = 'us-west-1';

AWS.config.update({
    accessKeyId:  "AKIAJVSGAOUL32MUL33A",
    secretAccessKey: "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",
    "region": "us-west-1"
});

var s3 = new AWS.S3();
if (os.platform() == "win32") {
	var file = require('fs').createReadStream("./release/FlowSetup.exe");
	var params = {Bucket: 'flow-install', Key: "FlowSetup.exe", Body: file};
} else if (os.platform() == "darwin") {
	var file = require('fs').createReadStream("./release/FlowSetup.dmg");
	var params = {Bucket: 'flow-install', Key: "Flow.dmg", Body: file};
} else {
	console.log("platform unknown: ",os.platform() );
	process.exit(1);
}

 s3.putObject(params, function(err, res) {
 	console.log("done!");
 	process.exit(1);
 })
.on('httpUploadProgress', function (progress) {
    console.log("Uploaded ",progress.loaded, " of ", progress.total, " bytes");
})
          .on('httpDone', function() { file.end(); console.log("finished"); });
