/**
 * Initialise le formulaire d'ajout d'un élément
 *
 * @param {HTMLFormElement} formElement - le formulaire d'ajout d'un item
 * @param {Function} onSubmit - La fonction à exécuter lorsque le formulaire est soumit
 */
export const initForm = (formElement, onSubmit) => {
  // 👉 Récupérer l'input et le bouton d'envoi du formulaire se trouvant
  // à l'intérieur de `formElement`

  const init = () => {
    updateAddButtonStatus()

    input.addEventListener("input", updateAddButtonStatus)
    formElement.addEventListener("submit", handleSubmit)
  }

  /**
   * Désactive le bouton d'envoi du formulaire si la valeur de l'input est vide
   * ou ne contient que des espaces
   */
  const updateAddButtonStatus = () => {
    // 👉 TODO
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 👉 Récupérer la valeur de l'input et en supprimer les espaces

    // 👉 Appeler la fonction `onSubmit` en lui passant la valeur précédente en paramètre

    // 👉 Vider la valeur de l'input
  }

  init()
}
