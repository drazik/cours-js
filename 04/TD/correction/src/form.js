import { registerUser } from "./api"
import * as alert from "./alert"

/**
 * Initialise le composant de formulaire
 *
 * @param {HTMLFormElement} form - l'élément de formulaire
 */
export const initForm = (form) => {
  let feedbackElement = null

  const init = () => {
    form.addEventListener("submit", handleSubmit)
  }

  const destroy = () => {
    form.removeEventListener("submit", handleSubmit)
  }

  /**
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = form.checkValidity()

    if (isValid) {
      // Récupérer les données du formulaire dans un objet FormData
      const userData = new FormData(form)

      /*
       * Exécuter la fonction registerUser en lui passant en paramètre l'objet FormData
       * créé précédemment.
       *
       * Si la requête ne renvoie pas d'erreur, afficher le message de succès
       * (fonction showSuccess), puis réinitialiser le formulaire et supprimer
       * la classe was-validated sur le formulaire
       *
       * Si la requête renvoie une erreur :
       *  - si l'objet d'erreur a une propriété `errors` qui contient un objet avec une propriété `global` : afficher ce message d'erreur
       *  - sinon, si l'objet d'erreur a une propriété `message` : afficher ce message d'erreur
       */
      try {
        await registerUser(userData)
        showSuccess()
        form.reset()
        form.classList.remove("was-validated")
      } catch (error) {
        if (error.errors && error.errors.global) {
          showError(error.errors.global)
        } else if (error.message) {
          showError(error.message)
        } else {
          console.error(error)
        }
      }
    } else {
      form.classList.add("was-validated")
    }
  }

  /**
   * Affiche un message d'erreur
   *
   * @param {string} message
   */
  const showError = (message) => {
    const errorElement = alert.make(message, alert.types.danger)
    updateFeedbackElement(errorElement)
  }

  /**
   * Affiche un message de succès
   *
   * @param {string} message
   */
  const showSuccess = () => {
    const message = "Votre inscription a bien été prise en compte"
    const successElement = alert.make(message, alert.types.success)
    updateFeedbackElement(successElement)
  }

  /**
   * Met à jour l'élément de feedback (succès ou erreur)
   *
   * @param {HTMLElement} newElement
   */
  const updateFeedbackElement = (newElement) => {
    if (feedbackElement) {
      feedbackElement.replaceWith(newElement)
    } else {
      form.prepend(newElement)
    }

    feedbackElement = newElement
  }

  init()

  return { destroy }
}
