var MongoClient = require('mongodb').MongoClient;
var elasticsearch = require('elasticsearch');

config  = {
		consoleMode : true,
		mongodb : "mongodb://localhost:27017/flowapp",
		admin : {user : "flow", password: "mondo989"}
};


// initialization takes place here
init = function(callback) {
	MongoClient.connect(config.mongodb, function(err, db) {
		if (err != null) {
			console.error(err);
			process.exit();
		}
		GLOBAL.db = db;
		GLOBAL.ec = new elasticsearch.Client({
		  host: '127.0.0.1:9200',
		});
		callback(null, null);
	});
};

GLOBAL.config = config;

module.exports = {"config" : config, "init" : init};
