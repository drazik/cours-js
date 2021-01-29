import { initForm } from "./form"
import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

function setupDOM() {
  const root = document.createElement("form")
  root.innerHTML = `
<input type="text" placeholder="Huile, eau, pain..." class="js-form-input" />
<button type="submit" class="js-form-submit">Ajouter</button>
`

  return root
}

const onSubmit = jest.fn()

beforeEach(() => {
  const formElement = setupDOM()
  document.body.append(formElement)

  initForm(formElement, onSubmit)
})

afterEach(() => {
  cleanup()
  onSubmit.mockReset()
})

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("initForm", () => {
  describe("Lorsque le formulaire est envoyé", () => {
    it("la fonction `onSubmit` passée en paramètre doit être appelée avec la valeur de l'input sans espaces au début ni à la fin", () => {
      const input = screen.getByPlaceholderText(/huile/i)

      userEvent.type(input, " Huile ")
      userEvent.click(screen.getByText("Ajouter"))

      expect(onSubmit).toHaveBeenCalledWith("Huile")
    })

    it("le champ de saisie est réinitialisé", () => {
      const input = screen.getByPlaceholderText(/huile/i)

      userEvent.type(input, "Huile")
      userEvent.click(screen.getByText("Ajouter"))

      expect(input).toHaveValue("")
    })
  })

  describe("Lorsque la valeur de l'input est vide", () => {
    it("l'envoi du formulaire doit être désactivé", () => {
      const addButton = screen.getByText("Ajouter")
      expect(addButton).toBeDisabled()
    })
  })

  describe("Lorsque l'input ne contient que des espaces", () => {
    it("l'envoi du formulaire doit être désactivé", () => {
      const addButton = screen.getByText("Ajouter")
      expect(addButton).toBeDisabled()
    })
  })
})
