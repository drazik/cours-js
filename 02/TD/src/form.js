/**
 * Initialise le formulaire d'ajout d'un élément
 *
 * @param {HTMLFormElement} formElement - le formulaire d'ajout d'un item
 * @param {Function} onSubmit - La fonction à exécuter lorsque le formulaire est soumit
 */
export function initForm(formElement, onSubmit) {
  // 👉 Récupérer l'élément input situé dans formElement
  // let input = ...

  function handleSubmit(e) {
    e.preventDefault()

    // 👉 Récupérer la valeur de input, et supprimer les espaces en début et en
    // fin de la chaîne de caractères
    // let trimmedValue = ...

    // 👉 Si la valeur n'est pas vide, appeler la fonction onSubmit en lui
    // passant la valeur, puis vider la valeur de input
  }

  formElement.addEventListener('submit', handleSubmit)
}
