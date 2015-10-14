app.service('es', function (esFactory) {
  return esFactory({
    host: 'http://www.tryflow.io:9200'
  });
});
