const {ipcMain} = require('electron')

ipcMain.on('sales:record', (event, arg) => {
  console.log(`Renderer process requests storing the sale of ${arg.soldItem} to ${arg.lastName} ${arg.firstName}`)
  // ToDo: Persist the sale-record and notify renderer-process about it
  event.sender.send('sales:recorded', arg)

  if (arg.remindInXMonths !== 0) {
    const salesDate = new Date(arg.salesDate)
    const contactOn = new Date(salesDate)
    contactOn.setMonth(contactOn.getMonth() + Number.parseInt(arg.remindInXMonths))

    const reminder = {
      contactOn,
      toBeContacted: `${arg.firstName} ${arg.lastName}`,
      reason: `${arg.soldItem} verkauft am ${salesDate.toLocaleDateString('de-DE')}`
    }

    // ToDo: Persist reminder, too
    console.log(`Alert stored to alert ${reminder.toBeContacted} on ${reminder.contactOn.toLocaleDateString('de-DE')} with reason "${reminder.reason}"`)
  }
})
