/**
 * @param {HTMLFormElement} formElement
 * @param {Object} options
 * @param {Function} options.onLoading
 */
export const init = (formElement, { onLoading, onError, onSuccess }) => {
  const submitButton = formElement.querySelector("button")
  const field = formElement.querySelector("input")

  const init = () => {
    updateSubmitButton()

    formElement.addEventListener("submit", handleSubmit)
    field.addEventListener("input", handleInput)
  }

  const destroy = () => {
    formElement.removeEventListener("submit", handleSubmit)
    field.removeEventListener("input", handleInput)
  }

  const updateSubmitButton = () => {
    submitButton.disabled = field.value.trim() === ""
  }

  /**
   * @param {Event}
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    onLoading()

    const url = new URL("https://lastfm-proxy-evaluation.herokuapp.com/artist")
    url.searchParams.append("q", field.value.trim())

    try {
      const response = await fetch(url.toString())

      if (response.ok) {
        const artist = await response.json()
        onSuccess(artist)
      } else {
        if (response.status === 404) {
          onError("Artiste introuvable")
        } else {
          onError("Erreur inconnue")
        }
      }
    } catch (error) {
      console.log(error)
      onError("Erreur inconnue")
    }
  }

  const handleInput = () => {
    updateSubmitButton()
  }

  init()

  return { destroy }
}
