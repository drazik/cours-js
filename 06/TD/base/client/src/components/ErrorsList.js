/**
  * @returns {HTMLUListElement}
  */
export const make = () => {
  const element = document.createElement("ul")
  element.classList.add("text-danger")

  return element
}

/**
  * @param {HTMLUListElement} listElement
  */
export const init = (listElement) => {
  const update = (errors) => {
    listElement.innerHTML = ""

    errors.forEach((error) => {
      const item = document.createElement("li")
      item.textContent = error.message

      listElement.append(item)
    })
  }

  return { update }
}
