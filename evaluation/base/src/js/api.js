/**
 * @typedef {Object} QueryResult
 * @property {Collection} collection
 */

/**
 * @typedef {Object} Collection
 * @property {CollectionItem[]} items
 * @property {CollectionLink[]} links
 */

/**
 * @typedef {Object} CollectionItem
 * @property {ItemData[]} data
 * @property {ItemLink[]} links
 */

/**
 * @typedef {Object} CollectionLink
 * @property {string} href
 * @property {"previous" | "next"} rel
 */

/**
 * @typedef {Object} ItemData
 * @property {string} title
 * @property {string} date_created
 * @property {string} description
 */

/**
 * @typedef {Object} ItemLink
 * @property {string} href
 * @property {string} rel
 */

/**
 * @param {string} query
 * @returns {Promise<QueryResult>}
 * @throws {Response}
 */
export const fetchImages = async (query) => {
  // TODO
}
