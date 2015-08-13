var app = require('app')
var BrowserWindow = require('browser-window')

require('electron-debug')();    //- This allows debugging CMD+ALT+I

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 900,
    height: 580,
    resizable: false,
    frame: false,
    "node-integration": true
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
})
