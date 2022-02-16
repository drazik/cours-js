export const create = () => {
  const element = document.createElement("div")
  element.className = "d-flex justify-content-center"

  element.innerHTML = `
  <div
    class="spinner-border text-primary"
    style="--size:5rem; width: var(--size); height: var(--size);"
    role="status"
    aria-label="loading"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
`

  /**
   * @param {HTMLElement} container
   */
  const show = (container) => {
    container.innerHTML = ""
    container.append(element)
  }

  const remove = () => {
    element.remove()
  }

  return { element, show, remove }
}
