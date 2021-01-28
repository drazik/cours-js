/**
 * Initialise le formulaire d'ajout d'un élément
 *
 * @param {HTMLFormElement} formElement - le formulaire d'ajout d'un item
 * @param {Function} onSubmit - La fonction à exécuter lorsque le formulaire est soumit
 */
export const initForm = (formElement, onSubmit) => {
  const input = formElement.querySelector("input")
  const addButton = formElement.querySelector("button")

  const init = () => {
    updateAddButtonStatus()

    input.addEventListener("input", updateAddButtonStatus)
    formElement.addEventListener("submit", handleSubmit)
  }

  const updateAddButtonStatus = () => {
    addButton.disabled = input.value.trim().length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedValue = input.value.trim()
    onSubmit(trimmedValue)

    input.value = ""
  }

  init()
}
