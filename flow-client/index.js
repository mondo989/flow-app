var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')


var url = require('url')
require('electron-debug')(); //- This allows debugging CMD+ALT+I

var bottomCarousel;

app.on('ready', function() {
  var electronScreen = require("screen");

  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  console.log(size);

  var mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    resizable: true,
    frame: false,
    "node-integration": true
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  bottomCarousel = new BrowserWindow({
    width: size.width-200,
    height: 100,
    frame: false,
    show: false,
    transparent: true,
    x: 100,
    y: size.height - 150,
    "always-on-top": true
  })

  GLOBAL.mainWindow = mainWindow;
  GLOBAL.bottomCarousel = bottomCarousel;

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
