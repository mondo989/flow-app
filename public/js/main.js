
// None of this is really used

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
