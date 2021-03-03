import * as InvalidFeedback from "./InvalidFeedback"

/**
  * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
  * @returns {FormField}
  */
export const init = (field) => {
  let invalidFeedback = null

  /**
    * @param {string} error
    */
  const setError = (error) => {
    field.classList.add("is-invalid")
    invalidFeedback = InvalidFeedback.make(error)
    field.insertAdjacentElement("afterend", invalidFeedback)
    console.log(invalidFeedback)
  }

  const resetError = () => {
    field.classList.remove("is-invalid")

    if (invalidFeedback) {
      invalidFeedback.remove()
      invalidFeedback = null
    }
  }

  return { setError, resetError }
}

/**
  * @typedef {Object} FormField
  * @property {Function} setError
  * @property {Function} resetError
  */
