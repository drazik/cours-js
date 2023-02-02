import { fetchArtist } from "../api-finished"

/**
 * @param {HTMLElement} rootElement
 */
export const init = (rootElement) => {
	/** @type {AbortController | null} */
	let abortController = null

	const show = async (artist) => {
		if (abortController) {
			abortController.abort()
		}

		showLoading(rootElement)

		abortController = new AbortController()

		try {
			const response = await fetchArtist(artist, { signal: abortController.signal })

			showResult(rootElement, response.artist)
		} catch (err) {
			console.error(err)
		}
	}

	return { show }
}

/**
 * @param {HTMLElement} rootElement
 */
const showLoading = (rootElement) => {
	rootElement.innerHTML = "Chargement..."
}

/**
 * @param {HTMLElement} rootElement
 */
const showResult = (rootElement, artist) => {
	const element = document.createElement("article")

	const tags = artist.tags.tag.map((tag) => {
		const item = document.createElement("li")
		item.textContent = tag.name

		return item
	})

	const tagsList = document.createElement("ul")
	tagsList.setAttribute("aria-label", "Styles")
	tagsList.append(...tags)

	const title = document.createElement("h2")
	title.textContent = artist.name

	const bio = document.createElement("p")
	bio.innerHTML = artist.bio.summary

	const similarArtists = artist.similar.artist.map((artist) => {
		const item = document.createElement("li")
		item.textContent = artist.name

		return item
	})

	const similarArtistsList = document.createElement("ul")
	similarArtistsList.append(...similarArtists)

	const similarArtistsTitle = document.createElement("h3")
	similarArtistsTitle.textContent = "Artistes similaires"

	element.append(title, tagsList, bio, similarArtistsTitle, similarArtistsList)

	rootElement.innerHTML = ""
	rootElement.append(element)
}
