var http = require( 'http' ),
    querystring = require( 'querystring' ),
    exec = require( 'child_process' ).exec;
var bodyParser = require('body-parser');


var app = require("express")();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var last_payload = {};

app.get("/githubhook", function( request, response ) {
    response.writeHead( 200, {'Content-Type': 'text/html'} );
    response.write( "<html><body><pre>" );
    response.write( JSON.stringify(last_payload, null, '\t') );
    response.write( "</pre></body></html>" );
    response.end();
  });

app.post("/githubhook", function( request, response ) {
	console.log("hook post");
	last_payload = request.body;
    console.log( new Date(), request.method, request.url, last_payload );

      exec( "./redeploy.sh", { cwd : process.cwd() }, function( error, stdout, stderr ) {
      	console.log(error, stdout, stderr);
        response.writeHead( 200, {'Content-Type': 'text/plain'} );
        response.end( error ? stderr : stdout );
      });
    });

module.exports = {"app" : app};
