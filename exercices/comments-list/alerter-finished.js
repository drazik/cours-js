import "./alerter.css"

/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
  /**
   * @param {string} message
   * @param {AlertOptions} options
   */
  const showAlert = (message, options) => {
    const element = createAlertElement(options.type, message)

    root.append(element)

    if (options.autoCloseDelay) {
      setTimeout(() => element.remove(), options.autoCloseDelay)
    }
  }

  return { showAlert }
}

/**
 * @param {"error" | "success"} type
 * @param {string} message
 */
const createAlertElement = (type, message) => {
  const alertElement = document.createElement("div")
  alertElement.classList.add("alert", `alert--${type}`)

  const messageElement = document.createElement("p")
  messageElement.classList.add("alert__message")
  messageElement.textContent = message

  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.classList.add("alert__close")
  closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="22" height="22">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>`

  const close = () => {
    closeButton.removeEventListener("click", close)
    alertElement.remove()
  }

  closeButton.addEventListener("click", close)

  alertElement.append(messageElement, closeButton)

  return alertElement
}

/**
 * @typedef {Object} AlertOptions
 * @propperty {"success" | "error"} type
 * @property {number} [autoCloseDelay]
 */
