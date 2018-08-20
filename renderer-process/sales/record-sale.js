const {ipcRenderer} = require('electron')

const remindInSelection = document.getElementById('remind-in');
const remindYesRadioBtn = document.getElementById('yes');

setupRemindInSelect();
setupSaveBtn();

function setupRemindInSelect() {
  const remindInNever = remindInSelection.options[0];
  const remindNoRadioBtn = document.getElementById('no');

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
      : remindInSelection.disabled = true;

    remindInSelection.disabled
      ? remindInSelection.options = remindInSelection.options.add(remindInNever, 0)
      : remindInSelection.options[0] = null;
  };

  remindYesRadioBtn.addEventListener('click', setSelectionActivation);
  remindNoRadioBtn.addEventListener('click', setSelectionActivation);
}

function setupSaveBtn() {
  const saveBtn = document.getElementById('save-salesrecord');
  const lastNameInput = document.getElementById('last-name');
  const firstNameInput = document.getElementById('first-name');
  const emailInput = document.getElementById('email');
  const addressTextArea = document.getElementById('address');
  const soldItemInput = document.getElementById('sold-item');
  const salesDateInput = document.getElementById('sales-date');

  saveBtn.addEventListener('click', (event) => {
    event.preventDefault();

    salesRecord = {
      lastName: lastNameInput.value,
      firstName: firstNameInput.value,
      email: emailInput.value,
      address: addressTextArea.value,
      soldItem: soldItemInput.value,
      salesDate: salesDateInput.value,
      remindInXMonths: remindYesRadioBtn.checked ? remindInSelection.value : 0
    };
    ipcRenderer.send('sales:record', salesRecord)
  });

  ipcRenderer.on('sales:recorded', (event, arg) => {
    console.log(`Main process stored the sale of ${arg.soldItem} to ${arg.lastName} ${arg.firstName}`)

    // ToDo: Give feedback like clearing the form and stating that the sale has been recorded
  })
}
