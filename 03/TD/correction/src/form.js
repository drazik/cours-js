/**
 * Initialise le composant de formulaire
 *
 * @param {HTMLFormElement} form - l'élément de formulaire
 */
export const initForm = (form) => {
  const init = () => {
    // 👉 Attacher la fonction `handleSubmit` à l'événement "submit" sur le formulaire
    form.addEventListener("submit", handleSubmit)
  }

  const destroy = () => {
    // 👉 Détacher la fonction `handleSubmit` de l'événement "submit" sur le formulaire
    form.removeEventListener("submit", handleSubmit)
  }

  /**
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    // 👉 Si le formulaire n'est pas valide, empêcher son envoi
    if (!form.checkValidity()) {
      e.preventDefault()
    }

    // 👉 Ajouter la classe `was-validated` sur le formulaire
    form.classList.add("was-validated")
  }

  init()

  return { destroy }
}
