const {ipcRenderer} = require('electron')

const validator = require('validator')

const remindInSelection = document.getElementById('remind-in')
const remindYesRadioBtn = document.getElementById('yes')

setupRemindInSelect()
setupSaveBtn()

function setupRemindInSelect () {
  const remindInNever = remindInSelection.options[0]
  const remindNoRadioBtn = document.getElementById('no')

  /**
   * Determine whether select should be disabled based on which radio
   * button is checked.
   *
   * Furthermore this function expects the first option of select to be
   * unacceptable and only a placeholder for the disabled state.
   * Thus the first option is assigned to a const and removed from
   * select.options if select is enabled and added as first option to
   * select.options if select is disabled.
   */
  const setSelectionActivation = (event) => {
    remindYesRadioBtn.checked
      ? remindInSelection.disabled = false
      : remindInSelection.disabled = true

    remindInSelection.disabled
      ? remindInSelection.options = remindInSelection.options.add(remindInNever, 0)
      : remindInSelection.options[0] = null
  }

  remindYesRadioBtn.addEventListener('click', setSelectionActivation)
  remindNoRadioBtn.addEventListener('click', setSelectionActivation)
}

function setupSaveBtn () {
  const saveBtn = document.getElementById('save-salesrecord')
  const lastNameInput = document.getElementById('last-name')
  const firstNameInput = document.getElementById('first-name')
  const emailInput = document.getElementById('email')
  const addressTextArea = document.getElementById('address')
  const soldItemInput = document.getElementById('sold-item')
  const salesDateInput = document.getElementById('sales-date')

  saveBtn.addEventListener('click', (event) => {
    event.preventDefault()

    if (isFormValid()) {
      const salesRecord = {
        lastName: lastNameInput.value,
        firstName: firstNameInput.value,
        email: emailInput.value,
        address: addressTextArea.value,
        soldItem: soldItemInput.value,
        salesDate: salesDateInput.value,
        remindInXMonths: remindYesRadioBtn.checked ? remindInSelection.value : 0
      }
      ipcRenderer.send('sales:record', salesRecord)
    } else {
      // ToDo: Handle invalid form state
      console.log('Form is invalid!')
    }
  })

  ipcRenderer.on('sales:recorded', (event, arg) => {
    console.log(`Main process stored the sale of ${arg.soldItem} to ${arg.lastName} ${arg.firstName}`)

    // ToDo: Give feedback like clearing the form and stating that the sale has been recorded
  })
}

function isFormValid () {
  const form = document.querySelector('form')

  let valid = true

  // Check if any of the required fields is empty
  const requiredFields = form.querySelectorAll('input[required]')
  for (let field of requiredFields) {
    const input = validator.trim(field.value + '')
    const isNotEmpty = !validator.isEmpty(input)
    console.log(`Input for ${field.name} was ${isNotEmpty ? input : 'empty'}`)
    valid = valid && isNotEmpty
    console.log(`validity of form because of fields checked so far: ${valid}`)
  }

  // Next check that the text inputs match the requested pattern
  const textFields = form.querySelectorAll('input[type="text"][pattern]')
  for (let field of textFields) {
    const input = validator.trim(field.value + '')
    const pattern = field.pattern
    const isMatch = validator.matches(input, pattern)
    console.log(`${field.name}'s input ${isMatch ? 'is a match' : 'is no match'} for type="text" and pattern ${pattern}`)
    valid = valid && isMatch
    console.log(`validity of form because of fields checked so far: ${valid}`)
  }

  // And check that the e-mail input is an actual email, if provided
  const emailFields = form.querySelectorAll('input[type="email"]')
  for (let field of emailFields) {
    const input = validator.trim(field.value + '')
    const isEmailOrEmpty = (validator.isEmpty(input) || validator.isEmail(input))
    console.log(`E-Mail input is ${isEmailOrEmpty ? 'fine (including empty)' : 'not an E-Mail'}`)
    valid = valid && isEmailOrEmpty
    console.log(`validity of form because of fields checked so far: ${valid}`)
  }

  // Finally verify that the date is valid (excluding future)
  const dateFields = form.querySelectorAll('input[type="date"')
  for (let field of dateFields) {
    const input = field.value + ''
    const isDateAndNotFuture = validator.toDate(input) !== null && !validator.isAfter(input)
    console.log(`Sale's date input ${isDateAndNotFuture ? 'is valid date' : 'is no valid date in the past'}`)
    valid = valid && isDateAndNotFuture
    console.log(`validity of form because of fields checked so far: ${valid}`)
  }

  return valid
}
