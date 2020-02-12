/**
 * Initialise le formulaire d'ajout d'un élément
 *
 * @param {HTMLFormElement} formElement - le formulaire d'ajout d'un item
 * @param {Function} onSubmit - La fonction à exécuter lorsque le formulaire est soumit
 */
export function initForm(formElement, onSubmit) {
  let input = formElement.querySelector('input')

  function getInputValue() {
    return input.value.trim()
  }

  // 👉 Récupérer l'élément situé dans `formElement` et qui porte la classe
  // `js-form-submit`
  let submitButton = formElement.querySelector('.js-form-submit')

  // 👉 Si la valeur de l'input trimmée est vide, alors désactiver le bouton
  submitButton.disabled = getInputValue() === ''

  function handleSubmit(e) {
    e.preventDefault()


    let trimmedValue = getInputValue()

    if (trimmedValue) {
      onSubmit(trimmedValue)

      input.value = ''
      submitButton.disabled = true
    }
  }

  formElement.addEventListener('submit', handleSubmit)

  // 👉 Ajouter un event listener sur l'input, pour l'événement `keyup`.
  // La fonction associée doit activer ou désactiver le bouton en fonction de la
  // valeur trimmée de l'input : le désactiver si elle est vide, l'activer sinon
  function handleKeyup() {
    submitButton.disabled = getInputValue() === ''
  }

  input.addEventListener('keyup', handleKeyup)
}
