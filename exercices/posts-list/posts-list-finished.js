export const init = (root) => {
	const load = async () => {
		showLoading(root)

		try {
			const posts = await fetchPosts()
			showPosts(root, posts)
		} catch (err) {
			showError(root)
		}
	}

	load()
}

/**
 * @returns {Promise<Array<Post>>
 */
const fetchPosts = async () => {
	const response = await fetch("/posts")

	if (!response.ok) {
		throw response
	}

	const responseData = await response.json()

	return responseData
}

/**
 * @param {HTMLElement} element
 */
const showLoading = (element) => {
	element.innerHTML = "<p>Chargement des articles en cours...</p>"
}

/**
 * @param {HTMLElement} element
 */
const showError = (element) => {
	element.innerHTML = "<p>Erreur lors du chargement des articles</p>"
}

/**
 * @param {HTMLElement} root
 * @param {Array<Post>} posts
 */
const showPosts = (element, posts) => {
	element.innerHTML = ""

	const postsElements = posts.map((post) => createPostElement(post))
	element.append(...postsElements)
}

/**
 * @param {Post} post
 */
const createPostElement = (post) => {
	const root = document.createElement("article")
	root.classList.add("post")

	const title = document.createElement("h2")
	title.classList.add("post-title")
	title.textContent = post.title

	const time = document.createElement("time")
	time.classList.add("post-date")
	time.dateTime = post.publishedAt
	time.textContent = new Date(post.publishedAt).toLocaleDateString()

	const excerpt = document.createElement("p")
	excerpt.classList.add("post-excerpt")
	excerpt.textContent = post.excerpt

	root.append(time, title, excerpt)

	return root
}

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} publishedAt
 * @property {string} excerpt
 */
