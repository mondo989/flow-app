
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
	console.log("email",email);
	fs.appendFileSync("/home/ec2-user/leads.txt", email+"\n");
	res.send("Thank you pageholder!");
})

module.exports = {"app" : app};
