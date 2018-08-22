const {ipcRenderer} = require('electron')

ipcRenderer.on('sales:recorded', (event, arg) => {
  console.log(`A new sale of ${arg.soldItem} has been recorded`)

  const tbody = document.getElementById('sales-records')

  const tr = document.createElement('tr')

  const tdDate = document.createElement('td')
  const dateText = document.createTextNode(new Date(arg.salesDate).toLocaleDateString('de-DE'))
  tdDate.appendChild(dateText)

  const tdName = document.createElement('td')
  const nameText = document.createTextNode(`${arg.firstName} ${arg.lastName}`)
  tdName.appendChild(nameText)

  const tdItem = document.createElement('td')
  const itemText = document.createTextNode(arg.soldItem)
  tdItem.appendChild(itemText)

  tr.appendChild(tdDate)
  tr.appendChild(tdName)
  tr.appendChild(tdItem)

  tbody.appendChild(tr)
})
