const {ipcRenderer} = require('electron')

ipcRenderer.send('alerts:load')

ipcRenderer.on('alerts:loaded', (event, arg) => {
  // ToDo: Receive either all or only already active alerts and add active alerts to view
  console.log(`All already active alerts loaded to display`)

  /* const tbody = document.getElementById('customers-to-contact')

  create rows and cells for each entry to be displayed
  and append to tbody */
})
