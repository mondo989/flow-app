var express = require("express");
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var mailgun = require('mailgun-js')({apiKey: "key-ac816160451f257bd27fb69c6645efeb", domain: "tryflow.io"});
var fs = require("fs");
var async = require("async");
var crypto = require("crypto");
var Mustache = require("mustache");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// login API
app.post("/api/login", function(req, webres) {
	async.waterfall([
		// search for the user
		function(cb) {
			return db.collection("usr_users").find({email : req.body["email"] }).toArray(cb);
		},
		// search for appropiate session cookie
		function(res, cb) {
			if (res.length == 0) {
				return webres.status(404).json({"err" : "No such user"});
			}
			return db.collection("usr_sessions").find({user_id : ObjectID(res[0]["_id"]), cookie : req.body["code"] }).toArray(cb);
		},
		// authenticate
		function(res, cb) {
			if (res.length == 0) {
				return webres.status(404).json({"err" : "Bad authentication code"});
			}
			webres.json({"ok" : "ok"});
		}
	]);
})

app.get("/api/search", function(req, res) {
	//var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	// res.send(output);
	res.json({"err" : "unimplemented"});
});


// admin functions below
// add basic authentication for modules listed from here:
app.use("/api/admin/*", function(req, res, next) {
	var user = basicAuth(req);
    if (!user || user.name !== config.admin.user || user.pass !== config.admin.password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    next();
})

app.get("/api/admin/userlist", function(req, res) {
	db.collection("usr_users").find().toArray(function(err, cres) {
		for (var i=0;i<cres.length;i++) {
			delete cres[i]["password"];
		}
		res.json(cres);
	});
});

function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
};

// admin approval function
app.get("/api/admin/approve/:id", function(req, webres) {
	if ((req.params["id"] === undefined) || ((req.params["id"].length < 12)))
		return res.status(400).json({"err" : "no id"});

	var cookie = randomValueHex(16);
	var userdata = null;

	async.waterfall([
		// search for the user
		function(cb) {
			return db.collection("usr_users").find({_id : ObjectID(req.params["id"])}).toArray(cb);
		},
		// add new desktop client session
		function(res, cb) {
			if (res.length == 0) {
				return webres.status(400).json({"err" : "not found"});
			}
			userdata = res[0];
			return db.collection('usr_sessions').insertOne( {
				"user_id" : res[0]["_id"],
				"cookie" : cookie,
				"cohort_date" : new Date()
			}, cb);
		},
		// send email via mailgun
		function(res, cb) {
			var data = {
			  from: 'Armando <hello@tryflow.io>',
			  to: userdata["email"],
			  subject: 'Welcome to Flow!',
			  text: Mustache.render(fs.readFileSync("./web/mail_activate.html", "utf8"), {"email" : userdata["email"], "code" : cookie} )
			};
			return mailgun.messages().send(data, cb);
		},
		function(res, cb) {
			return db.collection("usr_users").update({_id : ObjectID(req.params["id"])}, {$set : {"state" : "approved"}}, cb);
		},
		function(res, cb) {
			return webres.json({"ok" : "ok" });
		}
		]);
});

module.exports = {"app" : app};

