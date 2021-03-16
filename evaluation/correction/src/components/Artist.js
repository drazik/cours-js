/**
 * @param {Artist} artist
 * @returns {HTMLElement}
 */
export const make = (artist) => {
  const root = document.createElement("article")

  const name = document.createElement("h1")
  name.textContent = artist.name

  const tagsList = document.createElement("ul")
  tagsList.classList.add("list-unstyled", "d-flex", "gap-1")

  const tagsItems = artist.tags.map((tag) => {
    const link = document.createElement("a")
    link.href = tag.url
    link.textContent = tag.name
    link.classList.add(
      "badge",
      "bg-primary",
      "text-decoration-none",
      "text-white"
    )

    const item = document.createElement("li")
    item.setAttribute("aria-label", tag.name)
    item.append(link)

    return item
  })

  tagsList.append(...tagsItems)

  const bioElement = document.createElement("p")
  bioElement.textContent = artist.bio.summary

  const similarTitle = document.createElement("h2")
  similarTitle.textContent = "Artistes similaires"

  const similarList = document.createElement("ul")
  const similarItems = artist.similar.map((similar) => {
    const item = document.createElement("li")
    item.setAttribute("aria-label", similar)
    item.textContent = similar

    return item
  })
  similarList.append(...similarItems)

  root.append(name, tagsList, bioElement, similarTitle, similarList)

  return root
}

/**
 * @typedef {Object} Artist
 * @property {string} name
 * @property {Tag[]} tags
 * @property {Biography} bio
 */

/**
 * @typedef {Object} Tag
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} Biography
 * @property {string} summary
 */
