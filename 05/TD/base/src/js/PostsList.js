import "../css/posts-list.css"

/**
 * @param {HTMLElement} root
 * @returns {PostsList}
 */
export const init = (root) => {
  const prepend = (postData) => {
    // TODO
  }

  const mount = async () => {
    // TODO
  }

  mount()

  return { prepend }
}

/**
 * @returns {Promise<import("./Post").PostData[]>}
 * @throws {Response}
 */
const fetchPosts = async () => {
  // TODO
}

/**
 * @typedef {Object} PostsList
 * @property {(postData: import("./Post").PostData) => void} prepend
 */
