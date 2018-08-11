const {ipcRenderer} = require('electron')

ipcRenderer.on('sales:recorded', (event, arg) => {
  console.log(`A new sale of ${arg.soldItem} has been recorded`)

  const tbody = document.getElementById('sales-records')

  const tr = document.createElement('tr')

  const td_date = document.createElement('td')
  const date_text = document.createTextNode(arg.salesDate)
  // ToDo: Transform the date string to the desired format (tbd)
  td_date.appendChild(date_text)

  const td_name = document.createElement('td')
  const name_text = document.createTextNode(`${arg.firstName} ${arg.lastName}`)
  td_name.appendChild(name_text)

  const td_item = document.createElement('td')
  const item_text = document.createTextNode(arg.soldItem)
  td_item.appendChild(item_text)

  tr.appendChild(td_date)
  tr.appendChild(td_name)
  tr.appendChild(td_item)

  tbody.appendChild(tr)
})