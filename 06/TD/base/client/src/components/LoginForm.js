import * as Form from "./Form"

/**
  * @param {HTMLFormElement} formElement
  * @param {Object} options
  * @param {Function} options.onSuccess
  * @returns {LoginForm}
  */
export const init = (formElement, { onSuccess }) => {
  let form = null

  const init = () => {
    form = Form.init(formElement, { onSuccess: handleSuccess })
  }

  const destroy = () => {
    form.destroy()
  }

  const handleSuccess = (data) => {
    window.localStorage.setItem("token", data.token)

    onSuccess(data)
  }

  init()

  return { destroy }
}

/**
  * @typedef {Object} LoginForm
  * @property {Function} destroy
  */
