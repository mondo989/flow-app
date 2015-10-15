var express = require("express"),
    app = express()

// mongoose.connect(secrets.db);
// mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Error. Please make sure that MongoDB is running."));

app.get("/test", isAuthenticated, function(req, res, next){
  res.send("123")
})

function isAuthenticated(req, res, next){
  if (false) next()
  else res.sendStatus(403)
}


app.listen(3000)



module.exports = app;
