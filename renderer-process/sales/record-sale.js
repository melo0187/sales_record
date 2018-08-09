const remindInSelection = document.getElementById('remind-in')
const remindInNever = remindInSelection.options[0]
const remindYesRadioBtn = document.getElementById('yes')
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