const {ipcMain} = require('electron')

ipcMain.on('alerts:load', (event) => {
  console.log('Renderer process requests loading stored reminders that are already active')

  // ToDo: Actually load reminders, if possible only the once whose date has already come aka the active reminders
  event.sender.send('alerts:loaded')
})
