var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')

var url = require('url')

require('electron-debug')(); //- This allows debugging CMD+ALT+I

var bottomCarousel;

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    resizable: true,
    frame: false,
    "node-integration": true
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  bottomCarousel = new BrowserWindow({
    width: 1700,
    height: 120,
    frame: false,
    show: false,
    transparent: true,
    x: 0,
    y: 2699,
    "always-on-top": true
  })

  console.log(bottomCarousel.webContents);

  console.log("awesome dirname: " + __dirname);

   var indexUrl = url.format({
    protocol: 'file',
    pathname:  __dirname + '/index.html',
    slashes: true,
    hash: 'bottom-carousel'
  })

  console.log(indexUrl)
  bottomCarousel.loadUrl(indexUrl)

  console.log("We passed the step")

})
