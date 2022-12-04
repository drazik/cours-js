/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
	const elements = getElements(root)

	const open = () => {
		elements.root.setAttribute("aria-expanded", "true")
	}

	const close = () => {
		elements.root.setAttribute("aria-expanded", "false")
	}

	elements.trigger.addEventListener("click", open)
	elements.overlay.addEventListener("click", close)
	elements.close.addEventListener("click", close)

	return {}
}

/**
 * @param {HTMLElement} root
 */
const getElements = (root) => {
	return {
		root,
		trigger: root.querySelector(".menu__trigger"),
		overlay: root.querySelector(".menu__overlay"),
		close: root.querySelector(".menu__close"),
	}
}
