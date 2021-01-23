import { initGame } from "./game.js"
import { generateRandomNumber } from "./utils.js"
import { screen, fireEvent } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

jest.mock("./utils.js")

const getExampleDOM = () => {
  const div = document.createElement("div")

  div.innerHTML = `
<form class="js-game-form">
  <label for="number">Entrez un nombre :</label>
  <input type="number" min="1" max="100" id="number" class="js-game-input" />
  <button type="submit">OK</button>
</form>
<p class="result js-game-result"></p>
<button type="button" class="js-game-reset" hidden>Rejouer</button>
  `

  return div
}

describe("initGame", () => {
  const min = 1
  const max = 100

  beforeEach(() => {
    const container = getExampleDOM()
    document.body.append(container)

    generateRandomNumber.mockReturnValue(50)
    initGame(container, { min, max })
  })

  afterEach(() => {
    ;[...document.body.children].forEach((child) => child.remove())
  })

  describe("Lorsque la partie est initialisée", () => {
    it("le bouton rejouer ne doit pas être visible", () => {
      expect(screen.getByText("Rejouer")).not.toBeVisible()
    })
  })

  describe("Lorsque le nombre entré est trop petit", () => {
    it("un message indiquant que le nombre est trop petit doit s'afficher", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "30")
      fireEvent.click(screen.getByText("OK"))

      expect(screen.getByText("C'est plus que 30 !")).toBeInTheDocument()
    })
  })

  describe("Lorsque le nombre entré est trop grand", () => {
    it("un message indiquant que le nombre est trop grand doit s'afficher", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "60")
      fireEvent.click(screen.getByText("OK"))

      expect(screen.getByText("C'est moins que 60 !")).toBeInTheDocument()
    })
  })

  describe("Lorsque le nombre entré est exact", () => {
    it("un message indiquant que le nombre entré est exact doit s'afficher", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "50")
      fireEvent.click(screen.getByText("OK"))
      expect(screen.getByText(/gagné/i)).toBeInTheDocument()
    })

    it("un bouton pour recommencer une partie doit s'afficher", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "50")
      fireEvent.click(screen.getByText("OK"))
      expect(screen.getByText("Rejouer")).toBeVisible()
    })

    it("le champ de saisie doit être désactivé", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "50")
      fireEvent.click(screen.getByText("OK"))
      expect(screen.getByLabelText(/entrez un nombre/i)).toBeDisabled()
    })

    it("le bouton d'envoi du formulaire doit être désactivé", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "50")
      fireEvent.click(screen.getByText("OK"))
      expect(screen.getByText("OK")).toBeDisabled()
    })
  })

  describe("Lorsque l'utilisateur click sur le bouton rejouer", () => {
    it("une nouvelle partie doit être initialisée", () => {
      userEvent.type(screen.getByLabelText(/entrez un nombre/i), "50")
      fireEvent.click(screen.getByText("OK"))
      fireEvent.click(screen.getByText("Rejouer"))

      expect(screen.getByText("Rejouer")).not.toBeVisible()
      expect(screen.getByLabelText(/entrez un nombre/i)).toHaveValue(null)
      expect(screen.getByText("OK")).not.toBeDisabled()
      expect(screen.getByLabelText(/entrez un nombre/i)).not.toBeDisabled()
    })
  })
})
