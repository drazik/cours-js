import * as LoginPage from "../pages/login"
import * as HomePage from "../pages/home"
import * as RegisterPage from "../pages/register"
import * as NotFoundPage from "../pages/notFound"
import { isLoggedIn } from "../services/auth"

/**
  * @param {HTMLElement} container
  * @param {Object} router
  */
export const init = (container, router) => {
  let currentPage

  const init = () => {
    initRoutes()
  }

  const initRoutes = () => {
    // Utiliser la méthode `on` du router pour définir une route pour l'URL "/",
    // qui affiche la page "home".
    // Utiliser le hook `before` sur cette route pour rendre la route protégée
    // (inaccessible si l'utilisateur n'est pas connecté)
    router
      .on("/", () => {
        currentPage = HomePage.render(container, router)
      }, {
        before: protectAuthenticatedRoute
      })

    // Utiliser la méthode `on` du router pour définir une route pour l'URL "/login", qui affiche la page "login"
      .on("/login", () => {
        currentPage = LoginPage.render(container, router)
      })

    // Utiliser la méthode `on` du router pour définir une route pour l'URL "/register", qui affiche la page "register"
      .on("/register", () => {
        currentPage = RegisterPage.render(container, router)
      })

    // Utiliser la méthode `notFound` du router pour afficher la page "notFound"
    // lorsque l'URL du navigateur ne correspond à aucune route gerée par
    // l'application
      .notFound(() => {
        currentPage = NotFoundPage.render(container, router)
      })

    router.hooks({
      leave: handleLeave
    })

    router.resolve()
  }

  /**
    * @param {Function} done - Callback à appeler sans paramètre pour poursuivre
    * le changement de page, ou avec `false` en paramètre pour empêcher le
    * changement de paage
    */
  const protectAuthenticatedRoute = (done) => {
    // Si l'utilisateur est connecté (voir module `src/services/auth.js`), on
    // poursuit le changement de page, sinon on empêche le changement de page
    // et on redirige vers la route `/login`
    if (isLoggedIn()) {
      done()
    } else {
      done(false)
      router.navigate("/login")
    }
  }

  const handleLeave = (done) => {
    if (currentPage && currentPage.destroy) {
      currentPage.destroy()
    }

    done()
  }

  const destroy = () => {
    router.destroy()
  }

  init()

  return { destroy }
}
