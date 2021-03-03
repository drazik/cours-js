/**
  * @param {HTMLButtonElement} button
  * @param {Object} options
  * @param {Function} options.afterLogout
  * @returns {LogoutButton}
  */
export const init = (button, { afterLogout }) => {
  const init = () => {
    button.addEventListener("click", logout)
  }

  const destroy = () => {
    button.removeEventListener("click", logout)
  }

  const logout = () => {
    window.localStorage.removeItem("token")

    afterLogout()
  }

  init()

  return { destroy }
}

/**
  * @typedef {Object} LogoutButton
  * @property {Function} destroy
  */
