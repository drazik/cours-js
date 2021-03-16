import * as Artist from "./Artist"

/**
 * @param {HTMLElement} container
 * @returns {Result}
 */
export const init = (container) => {
  const showLoading = () => {
    container.innerHTML = ""

    const loadingMessage = document.createElement("p")
    loadingMessage.textContent = "Chargement en cours..."

    container.append(loadingMessage)
  }

  /**
   * @param {String} errorMessage
   */
  const showError = (errorMessage) => {
    container.innerHTML = ""

    const errorElement = document.createElement("p")
    errorElement.textContent = errorMessage

    container.append(errorElement)
  }

  /**
   * @param {Object} artist
   */
  const showArtist = (artist) => {
    container.innerHTML = ""
    container.append(Artist.make(artist))
  }

  return { showLoading, showError, showArtist }
}

/**
 * @typedef {Object} Result
 * @property {Function} showLoading
 * @property {Function} showError
 * @property {Function} showArtist
 */
