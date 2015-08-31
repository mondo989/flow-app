app.service('es', function (esFactory) {
  return esFactory({
    host: 'http://ec2-54-153-123-48.us-west-1.compute.amazonaws.com:9200'
  });
});
