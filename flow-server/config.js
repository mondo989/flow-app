var sqlite3 = require('sqlite3').verbose();

config  = {
		consoleMode : true,
};


// initialization takes place here
init = function(callback) {
	GLOBAL.db = new sqlite3.Database('/home/ec2-user/flow.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err, res) {
		callback(null, null);
	});
};

module.exports = {"config" : config, "init" : init};

