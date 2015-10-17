var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// admin web interface
// add basic authentication for modules listed from here:
app.use("/admin/*", function(req, res, next) {
	var user = basicAuth(req);
    if (!user || user.name !== config.admin.user || user.pass !== config.admin.password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    next();
})

// returns main landing page
app.get("/admin/", function(req, res) {
	var output = fs.readFileSync("./web/admin.html", "utf8");
	res.send(output);
});

module.exports = {"app" : app};

