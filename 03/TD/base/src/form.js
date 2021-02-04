/**
 * Initialise le composant de formulaire
 *
 * @param {HTMLFormElement} form - l'élément de formulaire
 */
export const initForm = (form) => {
  const init = () => {
    // 👉 Attacher la fonction `handleSubmit` à l'événement "submit" sur le formulaire

  }

  const destroy = () => {
    // 👉 Détacher la fonction `handleSubmit` de l'événement "submit" sur le formulaire

  }

  /**
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    // 👉 Si le formulaire n'est pas valide, empêcher son envoi


    // 👉 Ajouter la classe `was-validated` sur le formulaire

  }

  init()

  return { destroy }
}
