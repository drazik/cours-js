import * as ErrorsList from "./ErrorsList"
import * as FormField from "./FormField"

/**
  * @param {HTMLFormElement} formElement
  * @param {Object} options
  * @param {Function} options.onSuccess
  */
export const init = (formElement, { onSuccess }) => {
  let globalErrorsList = null
  let fields = null

  const init = () => {
    const globalErrorsListElement = ErrorsList.make()
    formElement.prepend(globalErrorsListElement)
    globalErrorsList = ErrorsList.init(globalErrorsListElement)

    fields = new Map(
      Array.from(formElement.querySelectorAll("input,textarea,select")).map(
        (field) => [field.name, FormField.init(field)]
      )
    )

    formElement.addEventListener("submit", handleSubmit)
  }

  const destroy = () => {
    formElement.removeEventListener("submit", handleSubmit)
  }

  /**
    * @param {Event} e
    */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formElement)

    try {
      const response = await fetch(formElement.action, {
        method: formElement.method,
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        return onSuccess(data)
      }

      throw data
    } catch (err) {
      processErrors(err)
    }
  }

  /**
    * @param {ResponseData|Error} err
    */
  const processErrors = (err) => {
    if (err.errors) {
      updateErrors(err.errors)
    } else {
      console.log(err)
      updateErrors([{ message: "Une erreur inconnue est survenue" }])
    }
  }

  /**
    * @param {ResponseError[]} errors
    */
  const updateErrors = (errors) => {
    const errorsWithField = errors.filter((error) => error.field)
    const errorsWithoutField = errors.filter((error) => !error.field)

    updateFieldErrors(errorsWithField)
    updateGlobalErrors(errorsWithoutField)

  }

  /**
    * @param {ResponseError[]} errors
    */
  const updateFieldErrors = (errors) => {
    fields.forEach((field) => field.resetError())

    errors.forEach((error) => {
      const field = fields.get(error.field)
      field.setError(error.message)
    })
  }

  /**
    * @param {ResponseError[]} errors
    */
  const updateGlobalErrors = (errors) => {
    globalErrorsList.update(errors)
  }

  init()

  return { destroy }
}

/**
  * @typedef {Object} ResponseData
  * @property {ResponseError[]} errors
  */

/**
  * @typedef {Object} ResponseError
  * @property {string} [field]
  * @property {string} message
  */
