const {ipcRenderer} = require('electron')

ipcRenderer.on('alerts:loaded', (event, arg) => {
  // ToDo: Receive either all or only already active alerts and add active alerts to view
  console.log(`All already active alerts loaded to display`)
})