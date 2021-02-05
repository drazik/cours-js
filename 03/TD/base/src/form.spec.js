import { initForm } from "./form"
import { screen, fireEvent } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const setupDOM = () => {
  const root = document.createElement("div")

  root.innerHTML = `
<form class="js-form" data-testid="form">
  <label for="username">Username</label>
  <input id="username" name="username" type="text" required />
  <button type="submit">Submit</button>
</form>
`

  return root
}

beforeEach(() => {
  const root = setupDOM()
  document.body.append(root)

  initForm(root.querySelector(".js-form"))
})

afterEach(() => {
  cleanup()
})

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("Lorsque l'utilisateur envoie le formulaire", () => {
  describe("lorsque le formulaire est valide", () => {
    it("le formulaire doit être envoyé", (done) => {
      const expectation = (e) => {
        expect(e.defaultPrevented).toBe(false)
        done()
      }
      document.body.addEventListener("submit", expectation)

      userEvent.type(screen.getByLabelText("Username"), "John Doe")
      fireEvent.submit(screen.getByTestId("form"))

      document.body.removeEventListener("submit", expectation)
    })
  })

  describe("lorsque le formulaire n'est pas valide", () => {
    it("le formulaire ne doit pas être envoyé", (done) => {
      const expectation = (e) => {
        expect(e.defaultPrevented).toBe(true)
        done()
      }
      document.body.addEventListener("submit", expectation)

      fireEvent.submit(screen.getByTestId("form"))

      document.body.removeEventListener("submit", expectation)
    })

    it("les messages de validation doivent s'afficher", () => {
      const form = screen.getByTestId("form")
      fireEvent.submit(form)
      expect(form).toHaveClass("was-validated")
    })
  })
})
