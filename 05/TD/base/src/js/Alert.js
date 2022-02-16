import { Alert as BSAlert } from "bootstrap"

/**
 * @param {string} message
 * @returns {HTMLDivElement}
 */
export const create = (message) => {
  // TODO
}

/**
 * @param {HTMLElement} element
 * @returns {Alert}
 */
export const init = (element) => {
  const alert = new BSAlert(element)

  return { element, close: alert.close.bind(alert) }
}

/**
 * @typedef {Object} Alert
 * @property {() => void} close
 * @property {HTMLElement} element
 */
