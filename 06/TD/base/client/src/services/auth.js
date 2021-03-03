const TOKEN_KEY = "token"

/**
  * @param {string} token
  */
export const setToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token)
}

/**
  * @returns {string|null}
	*/
export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}

/**
  * @returns {boolean}
  */
export const isLoggedIn = () => {
	const token = getToken()
	return Boolean(token)
}
