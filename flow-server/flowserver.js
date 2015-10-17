#!/usr/local/bin/node
// main entry point for all webapps

var fs = require("fs");
var async = require("async");
var config = require("./config.js");
var argv = require('minimist')(process.argv.slice(2));

var express = require("express");
var bodyParser = require('body-parser');
var compression = require('compression')
var http = require('http');

var webapps = require("./web");

if (!module.parent) {
	config.init(function() {
		var cport = (argv["port"] !== undefined)?(argv["port"]):(1337);
		var chost = (argv["host"] !== undefined)?(argv["host"]):("127.200.0.10");
		// IIS defines port via environment variables
		if (process.env.PORT !== undefined)
			cport = process.env.PORT;
		// initialize web server
		var app = express();
		app.use(require('express-domain-middleware'));
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(compression({ threshold: 512}));
		app.use('/static/', express.static(__dirname + '/static/'));
		app.use('/site/', express.static(__dirname + '/web/site/'));

		for (var cname in webapps) {
			app.use(webapps[cname]["app"]);
		}
		var server = http.createServer(app);
		server.listen(cport, chost);

		console.log("Server started on "+chost+":"+cport+" ");
	});
}
