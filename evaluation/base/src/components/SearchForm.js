/**
 * @param {HTMLFormElement} formElement
 * @param {Object} options
 * @param {Function} options.onLoading
 * @param {Function} options.onError
 * @param {Function} options.onSuccess
 */
export const init = (formElement, { onLoading, onError, onSuccess }) => {
  // Récupérer le bouton d'envoi et le champ de saisie dans formElement

  const init = () => {
    // Ecouter l'événement "submit" sur formElement et y associer la fonction
    // handleSubmit
    // Ecouter l'événement "input" sur le champ de saisie et y associer la
    // fonction handleInput
  }

  const destroy = () => {
    // Supprimer les événements
  }

  /** @param {Event}
   */
  const handleSubmit = async (e) => {
    // Récupérer la saisie de l'utilisateur. L'utiliser pour former l'URL sur
    // laquelle faire une requête asynchrone pour récupérer les données de
    // l'artiste saisit. Utiliser les fonctions onLoading, onError et onSubmit
    // en fonction de l'état d'avancement de la requête.
  }

  const handleInput = () => {}

  init()

  return { destroy }
}
