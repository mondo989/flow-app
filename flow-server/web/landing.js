
var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var Mustache = require("mustache");
var validator = require("email-validator");

app.use(bodyParser.urlencoded({ extended: false }));

// returns main landing page
app.get("/", function(req, res) {
	var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	res.send(output);
});

app.post("/", function(req, res) {
	errorOutput = function(err) {
		var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : err} );
		res.send(output);
	}
	if ((req.body == undefined) || (req.body["email"] == undefined) || (req.body["email"] == ""))
		return errorOutput("No email set!")
	var email = req.body["email"];
	if (!validator.validate(email))
		return errorOutput("Not valid email address");
	db.collection('usr_users').insertOne( {
		"email" : email,
		"password" : null,
		"state" : "unapproved",
		"signup_date" : new Date()
	}, function(err, mongores) {
		console.log("New user signup",email);
		return res.redirect(301, "/thank-you-form");
		// res.send("Thank you pageholder!");
	});

})


// returns about page
app.get("/about", function(req, res) {
	var output = Mustache.render(fs.readFileSync("./web/about.html", "utf8"), {"err" : ""} );
	res.send(output);
});

app.get("/logintest", function(req, res) {
	var output = Mustache.render(fs.readFileSync("./web/logintest.html", "utf8"), {"err" : ""} );
	res.send(output);
});


module.exports = {"app" : app};

