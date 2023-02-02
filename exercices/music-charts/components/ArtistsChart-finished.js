import { fetchTopArtistsChart } from "../api-finished"

/**
 * @param {HTMLElement} rootElement
 */
export const init = (rootElement, options) => {
	const elements = getElements(rootElement)

	const onMount = async () => {
		showLoader(elements.content)

		try {
			const response = await fetchTopArtistsChart()

			const artistsElements = response.artists.artist.map((artist) => createArtistElement(artist))

			artistsElements.forEach((element) => {
				element.addEventListener("click", handleClick)
			})

			elements.content.innerHTML = ""
			elements.content.append(...artistsElements)
		} catch (err) {
			showError(elements.content, err)
			console.error(err)
		}
	}

	/**
	 * @param {MouseEvent} e
	 */
	const handleClick = (e) => {
		options?.onSelect?.(e.currentTarget.dataset.artist)
	}

	onMount()
}

/**
 * @param {HTMLElement} rootElement
 */
const getElements = (rootElement) => {
	return {
		root: rootElement,
		content: rootElement.querySelector("[data-slot='content']"),
	}
}

/**
 * @param {HTMLElement} contentElement
 */
const showLoader = (contentElement) => {
	contentElement.innerHTML = "Chargement..."
}

/**
 * @param {HTMLElement} contentElement
 * @param {unknown} error
 */
const showError = (contentElement, _error) => {
	contentElement.innerHTML = "Une erreur est survenue"
}

/**
 * @param {Artist} artist
 */
const createArtistElement = (artist) => {
	const button = document.createElement("button")
	button.type = "button"
	button.dataset.artist = artist.name
	button.textContent = artist.name

	return button
}
