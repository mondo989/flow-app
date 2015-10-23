
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'trace'
});

client.search({
  index: 'assets',
  body: {
      "query": {
        "match": {
          "tags": {
            "query": ["iphone black"],
            "operator": "AND"
          }
        }
      },"size" : 150
    },
}).then(function (resp) {
	console.log(JSON.stringify(resp,0,4));
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});
