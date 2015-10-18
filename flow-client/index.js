var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')


var url = require('url')
require('electron-debug')(); //- This allows debugging CMD+ALT+I

app.on('ready', function() {
  var electronScreen = require("screen");

  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  var mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    resizable: true,
    frame: false,
    title : "Flow Assets",
    "node-integration": true
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  var bottomCarousel = new BrowserWindow({
    width: size.width-200,
    height: 100,
    frame: false,
    show: false,
    transparent: true,
    x: 100,
    y: size.height - 150,
    title : "Flow Downloads",
    "always-on-top": true
  })

  console.log("current dirname: " + __dirname);

  var indexUrl = url.format({
    protocol: 'file',
    pathname:  __dirname + '/index.html',
    slashes: true,
    hash: 'bottom-carousel'
  })

  bottomCarousel.loadUrl(indexUrl)

  console.log("App started")

})


app.on('window-all-closed', function() {
  console.log("all windows closed");
  app.quit();
});