import { fetchArtists } from "../api-finished"

/**
 * @param {HTMLFormElement} rootElement
 * @param {SearchFormOptions} options
 */
export const init = (rootElement, options) => {
	const elements = getElements(rootElement)
	let artists = []

	/**
	 * @param {SubmitEvent} e
	 */
	const handleSubmit = async (e) => {
		e.preventDefault()
	}

	let abortController = null

	/**
   * @param {InputEvent} e
   */
	const handleInput = async (e) => {
		if (abortController) {
			abortController.abort()
		}

		if (e.inputType === "insertReplacementText") {
			const artist = artists.find((artist) => artist.name === e.currentTarget.value)
			options?.onSelect?.(artist)
			return
		}

		const query = e.currentTarget.value.trim()

		if (query === "") {
			artists = []
		} else {
			abortController = new AbortController()

			try {
				const response = await fetchArtists(query, { signal: abortController.signal })
				
				artists = response.results.artistmatches.artist
			} catch (err) {
				console.error(err)
			}
		}

		updateDatalist(elements.datalist, artists)
	}

	elements.root.addEventListener("submit", handleSubmit)
	elements.queryInput.addEventListener("input", handleInput)

	/**
	 * @param {string} query
	 */
	const setQuery = (query) => {
		elements.queryInput.value = query
	}

	return { setQuery }
}

/**
 * @typedef {Object} SearchFormOptions
 * @property {(artist) => void} onSuccess
 * @property {(error) => void} onSuccess
 */ 

/**
 * @param {HTMLFormElement} rootElement
 */
const getElements = (rootElement) => {
	return {
		root: rootElement,
		queryInput: rootElement.elements.query,
		datalist: rootElement.querySelector("#search-artists"),
	}
}

/**
 * @param {HTMLDataListElement} datalist
 * @param {Array<Artist>} artists
 */
const updateDatalist = (datalist, artists) => {
	datalist.innerHTML = ""

	const options = artists.map(artistToOption)
	datalist.append(...options)
}

/**
 * @param {Artist} artist
 */
const artistToOption = (artist) => {
	const option = document.createElement("option")
	option.value = artist.name

	return option
}
