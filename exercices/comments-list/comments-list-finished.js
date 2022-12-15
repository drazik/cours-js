/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
	const onInit = async () => {
		root.innerHTML = "<p>Chargement des commentaires en cours...</p>"

		try {
			const comments = await fetchComments()

			const commentsElements = comments.map((comment) => createCommentElement(comment))
			const fragment = new DocumentFragment()
			fragment.append(...commentsElements)

			root.innerHTML = ""
			root.append(fragment)
		} catch (err) {
			console.error(err)
			root.innerHTML = "<p>Erreur lors du chargement des commentaires</p>"
		}
	}

	/**
	 * @param {import("./comment-form").Comment} comment
	 */
	const addComment = (comment) => {
		const element = createCommentElement(comment)
		root.append(element)
		element.scrollIntoView({ behavior: "smooth" })
	}

	onInit()

	return { addComment }
}

const fetchComments = async () => {
	const response = await fetch("/comments")

	if (!response.ok) {
		throw response
	}

	/** @type Promise<Array<import("./comment-form").Comment>> */
	const comments = await response.json()
	
	return comments
}

/**
 * @param {import("./comment-form").Comment} comment
 */
const createCommentElement = (comment) => {
	const element = document.createElement("article")
	element.classList.add("comment")

	const emailElement = document.createElement("p")
	emailElement.classList.add("comment__email")
	emailElement.textContent = comment.email

	const dateElement = document.createElement("time")
	dateElement.classList.add("comment__date")
	dateElement.dateTime = comment.publishedAt
	dateElement.textContent = new Date(comment.publishedAt).toLocaleDateString()

	const contentElement = document.createElement("p")
	contentElement.classList.add("comment__content")
	contentElement.textContent = comment.content

	element.append(emailElement, dateElement, contentElement)

	return element
}
