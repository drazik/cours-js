import * as App from "./App"
import { screen, waitFor } from "@testing-library/dom"
import "@testing-library/jest-dom"
import { isLoggedIn } from "../services/auth"
import Navigo from "navigo"
import userEvent from "@testing-library/user-event"

jest.mock("../services/auth")

const setup = () => {
  const container = document.createElement("div")
  document.body.append(container)
  const router = new Navigo("/")
  const app = App.init(container, router)

  return { app, router }
}

afterEach(() => cleanup())

const cleanup = () => {
  document.body.innerHTML = ""
}

describe("lorsque l'utilisateur arrive sur la page d'accueil", () => {
  describe("lorsque l'utilisateur n'est pas déjà connecté", () => {
    it("l'utilisateur doit être redirigé vers la page de connexion", () => {
      isLoggedIn.mockReturnValue(false)
      const { router, app } = setup()
      router.navigate("/")

      expect(screen.getByRole("heading", { level: 1, name: "Connexion" })).toBeInTheDocument()

      app.destroy()
    })
  })

  describe("lorsque l'utilisateur est connecté", () => {
    it("l'utilisateur doit voir la page", () => {
      isLoggedIn.mockReturnValue(true)
      const { router, app } = setup()
      router.navigate("/")

      expect(screen.getByText("Hello home")).toBeInTheDocument()

      app.destroy()
    })
  })
})

describe("lorsque l'utilisateur arrive sur la page de connexion", () => {
  describe("lorsque l'utilisateur entre des identifiants valides", () => {
    it("l'utilisateur doit être redirigé vers la page d'accueil", async () => {
      fetch.mockResponseOnce(JSON.stringify({ token: "abcdef" }))

      const { router, app } = setup()
      router.navigate("/login")

      userEvent.type(screen.getByRole("textbox", { name: "Email" }), "john@doe.com")
      userEvent.type(screen.getByLabelText("Mot de passe"), "p@ssw0rd")
      userEvent.click(screen.getByRole("button", { name: "Connexion" }))

      await waitFor(() => expect(screen.getByText("Hello home")).toBeInTheDocument())

      app.destroy()
    })
  })
})

describe("lorsque l'utilisateur arrive sur la page d'inscription", () => {
  describe("lorsque l'utilisateur entre des données valides", () => {
    it("l'utilisateur doit être redirigé vers la page de connexion", async () => {
      fetch.mockResponseOnce(JSON.stringify({}))

      const { router, app } = setup()
      router.navigate("/register")

      userEvent.type(screen.getByRole("textbox", { name: "Email" }), "john@doe.com")
      userEvent.type(screen.getByLabelText("Mot de passe"), "p@ssw0rd")
      userEvent.click(screen.getByRole("button", { name: "Inscription" }))

      await waitFor(() => expect(screen.getByRole("heading", { name: "Connexion" })).toBeInTheDocument())

        app.destroy()
    })
  })
})
