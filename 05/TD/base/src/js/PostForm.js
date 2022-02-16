import * as Alert from "./Alert"

/**
 * @param {HTMLFormElement} root
 * @param {PostFormOptions} [options]
 */
export const init = (root, options = {}) => {
  /** @type {HTMLButtonElement} */
  const submitButton = root.querySelector("button[type='submit']")
  let alert = null

  const updateSubmitButton = () => {
    submitButton.disabled = root.elements.body.value.trim().length === 0
  }

  /**
   * @param {SubmitEvent} e
   */
  const handleSubmit = async (e) => {
    // TODO
  }

  const mount = () => {
    // TODO
  }

  const unmount = () => {
    // TODO
  }

  mount()

  return { unmount }
}

/**
 * @param {Object} data
 * @param {string} data.body
 * @returns {Promise<{ body: string }>}
 * @throws {Response}
 */
const createPost = async (data) => {
  // TODO
}
