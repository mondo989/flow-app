var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// login API
app.get("/api/login", function(req, res) {
	//var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	// res.send(output);
	res.json({"err" : "unimplemented"});
});

app.get("/api/search", function(req, res) {
	//var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	// res.send(output);
	res.json({"err" : "unimplemented"});
});


// admin functions below
app.get("/api/userlist", function(req, res) {
});

// admin approval function
app.get("/api/approve", function(req, res) {
	//var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	// res.send(output);
	res.json({"err" : "unimplemented"});
});

module.exports = {"app" : app};

