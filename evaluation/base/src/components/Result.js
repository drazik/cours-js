/**
 * @param {HTMLElement} container
 * @returns {Result}
 */
export const init = (container) => {
  const showLoading = () => {
    container.innerHTML = ""

    // Insérer un élément avec le contenu "Chargement en cours..." dans le
    // container
  }

  /**
   * @param {String} errorMessage
   */
  const showError = (errorMessage) => {
    container.innerHTML = ""

    // Insérer un élément contenant le message d'erreur dans le container
  }

  /**
   * @param {Object} artist
   */
  const showArtist = (artist) => {
    container.innerHTML = ""

    // Insérer un élément contenant les données de l'artiste dans le container
  }

  return { showLoading, showError, showArtist }
}

/**
 * @typedef {Object} Result
 * @property {Function} showLoading
 * @property {Function} showError
 * @property {Function} showArtist
 */
