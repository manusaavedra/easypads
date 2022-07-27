export function clearButtons(currentCheckbox) {
    const buttons = document.getElementsByName('note')
    buttons.forEach(button => {
        if (currentCheckbox !== button)
            button.checked = false
    })
}