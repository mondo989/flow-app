var express = require("express");
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
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

// admin approval function
app.get("/api/admin/approve", function(req, res) {
	//var output = Mustache.render(fs.readFileSync("./web/landing.html", "utf8"), {"err" : ""} );
	// res.send(output);
	res.json({"err" : "unimplemented"});
});

module.exports = {"app" : app};

