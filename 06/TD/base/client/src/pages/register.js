import markup from "./register.html"
import * as RegisterForm from "../components/RegisterForm"

/**
  * @param {HTMLElement} container
  * @param {object} router
  */
export const render = (container, router) => {
  container.innerHTML = markup

  let registerForm = null

  const init = () => {
    document.title = "Inscription"

    registerForm = RegisterForm.init(
      container.querySelector(".js-register-form"),
      {
        onSuccess: () => router.navigate("/login")
      }
    )
  }

  const destroy = () => {
    registerForm.destroy()
  }
  
  init()

  return { destroy }
}
