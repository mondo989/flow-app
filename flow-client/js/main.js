
// None of this is really used
// This is for building an application menu for the title bar

var remote = require('remote')
var ipc = require('ipc')
var menu = remote.require('menu')

var menu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Prefs',
        click: function () {
          ipc.send('show-carousel')
        }
      }
    ]
  }
])
Menu.setApplicationMenu(menu)
