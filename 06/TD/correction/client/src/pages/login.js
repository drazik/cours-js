import markup from "./login.html"
import * as LoginForm from "../components/LoginForm"

/**
  * @param {HTMLElement} container
  * @param {object} router
  */
export const render = (container, router) => {
  container.innerHTML = markup
  
  let loginForm = null

  const init = () => {
    document.title = "Connexion"

    loginForm = LoginForm.init(container.querySelector(".js-login-form"), {
      onSuccess: () => router.navigate("/")
    })
  }

  const destroy = () => {
    loginForm.destroy()
  }

  init()

  return { destroy }
}
