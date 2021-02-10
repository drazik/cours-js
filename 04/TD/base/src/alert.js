/*
 * Crée un élément d'alerte
 *
 * @see https://getbootstrap.com/docs/5.0/components/alerts/
 *
 * @param {string} message - Le message d'alerte
 * @param {AlertType} type - Le type d'alerte
 * @return {HTMLDivElement}
 */
export const make = (message, type) => {
  /** @type {HTMLDivElement} */
  const element = document.createElement("div")
  element.setAttribute("role", "alert")
  element.textContent = message

  element.classList.add("alert")

  if (type) {
    element.classList.add(`alert-${type}`)
  }

  return element
}

/**
 * @typedef {string} AlertType
 */

/**
 * @enum {AlertType}
 */
export const types = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "light",
  dark: "dark",
}
