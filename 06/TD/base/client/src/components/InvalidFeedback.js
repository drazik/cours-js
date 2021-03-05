/**
  * @param {string} message
  * @returns {HTMLDivElement}
  */
export const make = (message) => {
  const element = document.createElement("div")
  element.classList.add("invalid-feedback")
  element.textContent = message

  return element
}
