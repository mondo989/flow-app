app.service('es', function (esFactory) {
  return esFactory({
    host: 'localhost:9200'
  });
});


// https://www.elastic.co/products/kibana
//
// Img url comes form bucket from amazon
//
// [{"img_url":"http;efer.png","title":"People on the beach","tags":["people","beach","girl"]},
