/**
 * @param {HTMLFormElement} root
 * @param {InitOptions} [options]
 */
export const init = (root, options) => {
	const elements = getElements(root)

	const handleSubmit = async (event) => {
		event.preventDefault()

		elements.submitButton.disabled = true

		try {
			const newComment = await createComment(new FormData(event.currentTarget))

			options?.onSuccess?.(newComment)
			elements.root.reset()
		} catch (err) {
			console.log(err)
			options?.onError?.()
		} finally {
			elements.submitButton.disabled = false
		}
	}

	elements.root.addEventListener("submit", handleSubmit)
}

/**
 * @param {HTMLFormElement} root
 */
const getElements = (root) => {
	return {
		root,
		submitButton: root.querySelector("button[type='submit']")
	}
}

/**
 * @param {FormData} commentData
 * @returns {Promise<Comment>}
 */
const createComment = async (commentData) => {
	const response = await fetch("/comment", {
		method: "post",
		body: commentData
	})

	if (!response.ok) {
		throw response
	}

	/** @type Comment */
	const responseData = await response.json()
	return responseData
}

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
