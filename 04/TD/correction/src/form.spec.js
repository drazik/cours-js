import { initForm } from "./form"
import { screen, fireEvent, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const setupDOM = () => {
  const root = document.createElement("div")

  root.innerHTML = `
<form class="js-form" data-testid="form">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />
  <label for="firstname">Firstname</label>
  <input id="firstname" name="firstname" type="text" required />
  <label for="lastname">Lastname</label>
  <input id="lastname" name="lastname" type="text" required />
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

beforeAll(() => {
  localStorage.clear()
})

describe("Lorsque l'utilisateur envoie le formulaire", () => {
  describe("lorsque le formulaire est valide", () => {
    describe("lorsque le serveur renvoie un succès", () => {
      beforeEach(() => {
        localStorage.clear()
      })

      it("le formulaire doit être réinitialisé", async () => {
        userEvent.type(screen.getByLabelText("Email"), "john@doe.com")
        userEvent.type(screen.getByLabelText("Password"), "azer")
        userEvent.type(screen.getByLabelText("Firstname"), "John")
        userEvent.type(screen.getByLabelText("Lastname"), "Doe")

        userEvent.click(screen.getByText("Submit"))

        await waitFor(() =>
          expect(screen.getByTestId("form")).toHaveFormValues({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
          })
        )
      })

      it("un message de succès doit s'afficher", async () => {
        userEvent.type(screen.getByLabelText("Email"), "john@doe.com")
        userEvent.type(screen.getByLabelText("Password"), "azer")
        userEvent.type(screen.getByLabelText("Firstname"), "John")
        userEvent.type(screen.getByLabelText("Lastname"), "Doe")

        userEvent.click(screen.getByText("Submit"))

        await waitFor(() =>
          expect(
            screen.getByText("Votre inscription a bien été prise en compte")
          ).toBeInTheDocument()
        )
      })
    })

    describe("lorsque le serveur renvoie une erreur", () => {
      it("un message d'erreur doit s'afficher", async () => {
        userEvent.type(screen.getByLabelText("Email"), "john@doe.com")
        userEvent.type(screen.getByLabelText("Password"), "azer")
        userEvent.type(screen.getByLabelText("Firstname"), "John")
        userEvent.type(screen.getByLabelText("Lastname"), "Doe")

        userEvent.click(screen.getByText("Submit"))

        await waitFor(() =>
          expect(
            screen.getByText("Un compte existe déjà pour cette adresse e-mail")
          ).toBeInTheDocument()
        )
      })
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
