var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var fs = require("fs");
var os = require("os");
var url = require('url')
require('electron-debug')(); //- This allows debugging CMD+ALT+I

// var autoUpdater = require('auto-updater');
// autoUpdater.setFeedUrl('https://tryflow.io/latest?version=' + app.getVersion());


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

  var mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    resizable: true,
    frame: false,
    title : "Flow Assets",
    "node-integration": true
  })
  mainWindow.useremail = "";
  mainWindow.usercode = "";

  // detect, if there's a user login already, using ~/.flow/profile.ini
  var cookie = "";
  if (!fileExists(os.homedir()+"/.flow"))
    fs.mkdirSync(os.homedir()+"/.flow");
  if (!fileExists(os.homedir()+"/.flow/profile.ini"))
    fs.writeFileSync(os.homedir()+"/.flow/profile.ini", "");
  else {
    var cookiefile = fs.readFileSync(os.homedir()+"/.flow/profile.ini").toString();
    var csv = cookiefile.split("\t");
    if (csv.length > 1) {
      mainWindow.useremail = csv[0];
      mainWindow.usercode = csv[1];
    }
  }
  if (mainWindow.useremail == "")
    mainWindow.loadUrl('file://' + __dirname + '/index.html#login')
  else
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



