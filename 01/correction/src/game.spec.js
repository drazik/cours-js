import { initGame } from "./game.js"
import { generateRandomNumber } from "./utils.js"
import { getByLabelText, fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"

jest.mock("./utils.js")

const getExampleDOM = () => {
  const div = document.createElement("div")

  div.innerHTML = `
<form class="js-form">
  <label for="number">Entrez un nombre :</label>
  <input type="number" min="1" max="100" id="number" />
  <button type="submit">OK</button>
</form>
<p class="result js-result" data-testid="result"></p>
  `

  return div
}

describe("initGame", () => {
  const min = 1
  const max = 100

  let container, form, result

  beforeEach(() => {
    container = getExampleDOM()
    form = container.querySelector(".js-form")
    result = container.querySelector(".js-result")

    generateRandomNumber.mockReturnValue(50)
    initGame(form, result, min, max)
  })

  describe("Lorsque le nombre entré est trop petit", () => {
    it("un message indiquant que le nombre est trop petit doit s'afficher", () => {
      const input = getByLabelText(container, /entrez un nombre/i)

      input.value = 30
      fireEvent.submit(form)
      expect(result).toHaveTextContent("C'est plus que 30 !")
    })
  })

  describe("Lorsque le nombre entré est trop grand", () => {
    it("un message indiquant que le nombre est trop grand doit s'afficher", () => {
      const input = getByLabelText(container, /entrez un nombre/i)

      input.value = 60
      fireEvent.submit(form)
      expect(result).toHaveTextContent("C'est moins que 60 !")
    })
  })

  describe("Lorsque le nombre entré est exact", () => {
    it("un message indiquant que le nombre entr est exact doit s'afficher", () => {
      const input = getByLabelText(container, /entrez un nombre/i)

      input.value = 50
      fireEvent.submit(form)
      expect(result).toHaveTextContent(/gagné/i)
    })
  })
})
