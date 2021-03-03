import * as Form from "./Form"

/**
  * @param {HTMLFormElement} formElement
  * @param {Object} options
  * @param {Function} options.onSuccess
  * @returns {RegisterForm}
  */
export const init = (formElement, { onSuccess }) => {
  let form = null

  const init = () => {
    form = Form.init(formElement, { onSuccess })
  }

  const destroy = () => {
    form.destroy()
  }

  init()

  return { destroy }
}

/**
  * @typedef {Object} RegisterForm
  * @property {Function} destroy
  */
