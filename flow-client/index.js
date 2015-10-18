var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var fs = require("fs");
var os = require("os");
var url = require('url')
require('electron-debug')(); //- This allows debugging CMD+ALT+I

var fileExists = function(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    if(err.code == 'ENOENT') return false;
  }
  return true;
}

app.on('ready', function() {
  var electronScreen = require("screen");

  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  // detect, if there's a user login already, using ~/.flow/profile.ini
  var cookie = "";
  if (!fileExists(os.homedir()+"/.flow"))
    fs.mkdirSync(os.homedir()+"/.flow");
  if (!fileExists(os.homedir()+"/.flow/profile.ini"))
    fs.writeFileSync(os.homedir()+"/.flow/profile.ini", "");
  else
    cookie = fs.readFileSync(os.homedir()+"/.flow/profile.ini");

  var mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    resizable: true,
    frame: false,
    title : "Flow Assets",
    "node-integration": true
  })
  if (cookie != "")
    mainWindow.loadUrl('file://' + __dirname + '/index.html')
  else
    mainWindow.loadUrl('file://' + __dirname + '/index.html#login')

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