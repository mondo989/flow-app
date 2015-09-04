var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')

require('electron-debug')();    //- This allows debugging CMD+ALT+I

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: false,
    frame: false,
    "node-integration": true
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  var bottomCarousel = new BrowserWindow({
    width: 900,
    height: 600,
  })
  bottomCarousel.loadUrl('file://' + __dirname + '/bottom-carousel.html')

  // ipc.on('show-bottom' function() {
  //   bottomCarousel.show()
  // })
})
