const {ipcMain} = require('electron')

ipcMain.on('sales:record', (event, arg) => {
  console.log(`Renderer process requests storing the sale of ${arg.soldItem} to ${arg.lastName} ${arg.firstName}`)
  // ToDo: Persist the sale-record and notify renderer-process about it
  event.sender.send('sales:recorded', arg)
})