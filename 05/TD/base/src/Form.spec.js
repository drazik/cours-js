import { Form } from "./Form.js"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("lorsque le champ est vide", () => {
  it("le bouton d'envoi doit être désactivé", () => {
    render(<Form onSubmit={jest.fn()} />)

    expect(screen.getByText("Envoyer")).toBeDisabled()
  })
})

describe("lorsque le champ ne contient que des espaces", () => {
  it("le bouton d'envoi doit être désactivé", () => {
    render(<Form onSubmit={jest.fn()} />)

    userEvent.type(screen.getByRole("textbox", { label: "Ville" }), "  ")

    expect(screen.getByText("Envoyer")).toBeDisabled()
  })
})

describe("lorsque l'utilisateur saisit quelque chose dans le champ", () => {
  it("le bouton d'envoi doit être activé", () => {
    render(<Form onSubmit={jest.fn()} />)

    userEvent.type(screen.getByRole("textbox", { label: "Ville" }), "Paris")

    expect(screen.getByText("Envoyer")).toBeEnabled()
  })
})

describe("lorsque l'utilisateur envoie le formulaire", () => {
  it("doit appeler la fonction onSubmit reçue en prop avec la saisie en paramètre", () => {
    const onSubmit = jest.fn()
    render(<Form onSubmit={onSubmit} />)

    userEvent.type(screen.getByRole("textbox", { label: "Ville" }), "Paris")
    userEvent.click(screen.getByText("Envoyer"))

    expect(onSubmit).toHaveBeenCalledWith("Paris")
  })
})
