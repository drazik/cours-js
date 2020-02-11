/**
 * Initialise le formulaire d'ajout d'un élément
 *
 * @param {HTMLFormElement} formElement - le formulaire d'ajout d'un item
 * @param {Function} onSubmit - La fonction à exécuter lorsque le formulaire est soumit
 */
export function initForm(formElement, onSubmit) {
  let input = formElement.querySelector('input')

  // 👉 Récupérer l'élément situé dans `formElement` et qui porte la classe
  // `js-form-submit`
  // let submitButton = ...

  // 👉 Si la valeur de l'input trimmée est vide, alors désactiver le bouton
  // submitButton.disabled = ...

  function handleSubmit(e) {
    e.preventDefault()


    let trimmedValue = input.value.trim()

    if (trimmedValue) {
      onSubmit(trimmedValue)

      input.value = ''
    }
  }

  formElement.addEventListener('submit', handleSubmit)

  // 👉 Ajouter un event listener sur l'input, pour l'événement `keyup`.
  // La fonction associée doit activer ou désactiver le bouton en fonction de la
  // valeur trimmée de l'input : le désactiver si elle est vide, l'activer sinon
}
