console.log("Hey Bae we loaded")

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');




console.log("Hey Bae we loaded")

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
