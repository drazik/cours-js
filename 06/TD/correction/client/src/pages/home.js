import markup from "./home.html"
import * as LogoutButton from "../components/LogoutButton"

/**
	* @param {HTMLElement} container
	*/
export const render = (container) => {
	container.innerHTML = markup

	let logoutButton = null

	const init = () => {
		document.title = "Accueil"

		logoutButton = LogoutButton.init(
			container.querySelector(".js-logout"),
			{
				afterLogout: () => window.location.reload()
			}
		)
	}

	const destroy = () => {
		logoutButton.destroy()
	}

	init()

	return { destroy }
}

export const authentified = true
