import { initApp } from "./app"
import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const setupDOM = () => {
  const root = document.createElement("div")

  root.innerHTML = `
<form>
  <input type="text" placeholder="Oeufs, huile, pain..." />
  <button type="submit">Ajouter</button>
</form>
<ul></ul>
`

  return root
}

beforeEach(() => {
  const root = setupDOM()
  document.body.append(root)

  initApp(root.querySelector("form"), root.querySelector("ul"))
})

afterEach(() => {
  cleanup()
})

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("Lorsque l'utilisateur arrive sur l'application", () => {
  it("le champ de saisie est vide", () => {
    expect(screen.getByPlaceholderText(/huile/i)).toHaveValue("")
  })

  it("le bouton d'envoi du formulaire est désactivé", () => {
    expect(screen.getByText("Ajouter")).toBeDisabled()
  })

  it("la liste est vide", () => {
    expect(screen.getByRole("list")).toBeEmptyDOMElement()
  })
})

describe("Lorsque l'utilisateur ajoute un élément à la liste", () => {
  it("l'élément doit apparaître dans la liste", () => {
    const input = screen.getByPlaceholderText(/huile/i)
    userEvent.type(input, "Pain")
    userEvent.click(screen.getByText("Ajouter"))
    expect(screen.getByLabelText("Pain")).toBeInTheDocument()
  })

  it("le champ de saisie doit être réinitialisé", () => {
    const input = screen.getByPlaceholderText(/huile/i)
    userEvent.type(input, "Pain")
    userEvent.click(screen.getByText("Ajouter"))
    expect(input).toHaveValue("")
  })
})

describe("Lorsque l'utilisateur supprime un élément de la liste", () => {
  it("l'élément doit disparaître de la liste", () => {
    const input = screen.getByPlaceholderText(/huile/i)
    userEvent.type(input, "Pain")
    userEvent.click(screen.getByText("Ajouter"))

    const deleteButton = screen.getByLabelText("Supprimer")
    userEvent.click(deleteButton)
    expect(screen.queryByLabelText("Pain")).not.toBeInTheDocument()
  })
})

describe("Lorsque l'utilisateur click sur un élément de la liste", () => {
  describe("Lorsque l'élément était déjà sélectionné", () => {
    it("l'élément ne doit plus être sélectionné", () => {
      const input = screen.getByPlaceholderText(/huile/i)
      userEvent.type(input, "Pain")
      userEvent.click(screen.getByText("Ajouter"))

      const checkbox = screen.getByLabelText("Pain")
      userEvent.click(checkbox)
      userEvent.click(checkbox)

      expect(checkbox).not.toBeChecked()
    })
  })

  describe("Lorsque l'élément n'était pas sélectionné", () => {
    it("l'élément doit être sélectionné", () => {
      const input = screen.getByPlaceholderText(/huile/i)
      userEvent.type(input, "Pain")
      userEvent.click(screen.getByText("Ajouter"))

      const checkbox = screen.getByLabelText("Pain")
      userEvent.click(checkbox)

      expect(checkbox).toBeChecked()
    })
  })
})
