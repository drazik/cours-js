/**
 * @param {HTMLFormElement} root
 * @param {InitOptions} [options]
 */
export const init = (root, options) => {}

/**
 * @typedef {Object} InitOptions
 * @property {(newComment: Comment) => void} [onSuccess]
 * @property {() => void} [onError]
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} publishedAt
 * @property {string} email
 * @property {string} content
 */
