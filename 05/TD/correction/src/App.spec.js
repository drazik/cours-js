import App from "./App.js"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("./api.js")
jest.spyOn(window.console, "error").mockImplementation(() => {})

it("doit afficher le formulaire", () => {
  render(<App />)

  expect(screen.getByRole("textbox", { label: "Ville" })).toBeInTheDocument()
  expect(screen.getByRole("button", { label: "Envoyer" })).toBeInTheDocument()
})

describe("lorsque l'utilisateur envoie le formulaire", () => {
  it("un message de chargement doit s'afficher", () => {
    render(<App />)

    userEvent.type(screen.getByRole("textbox", { label: "Ville" }), "Paris")
    userEvent.click(screen.getByRole("button", { label: "Envoyer" }))

    expect(screen.getByText("Chargement...")).toBeInTheDocument()
  })

  describe("lorsque l'API renvoie une erreur", () => {
    it("un message d'erreur doit s'afficher", async () => {
      render(<App />)

      userEvent.type(
        screen.getByRole("textbox", { label: "Ville" }),
        "Existepas"
      )
      userEvent.click(screen.getByRole("button", { label: "Envoyer" }))

      await waitFor(() =>
        expect(
          screen.getByText("La ville demandée est introuvable")
        ).toBeInTheDocument()
      )
    })
  })

  describe("lorsque l'API renvoie une réponse", () => {
    it("doit afficher les données renvoyées", async () => {
      render(<App />)

      userEvent.type(screen.getByRole("textbox", { label: "Ville" }), "Paris")
      userEvent.click(screen.getByRole("button", { label: "Envoyer" }))

      await waitFor(() =>
        expect(screen.getByText("Météo à Paris")).toBeInTheDocument()
      )
    })
  })
})
