import { initGame } from './game.js'
import { generateRandomNumber } from './utils.js'
import { getByLabelText, getByText, getByTestId, fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

jest.mock('./utils.js')

function getExampleDOM() {
  let div = document.createElement('div')
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

describe('initGame', () => {
  let container, form, result, min = 1, max = 100

  beforeEach(() => {
    container = getExampleDOM()
    form = container.querySelector('.js-form')
    result = container.querySelector('.js-result')

    generateRandomNumber.mockReturnValue(50)
    initGame(form, result, min, max)
  })

  it('should tell when the given number is too low', () => {
    let input = getByLabelText(container, /entrez un nombre/i)

    input.value = 30
    fireEvent.submit(form)
    expect(result).toHaveTextContent("C'est plus que 30 !")
  })

  it('should tell when the given number is too high', () => {
    let input = getByLabelText(container, /entrez un nombre/i)

    input.value = 60
    fireEvent.submit(form)
    expect(result).toHaveTextContent("C'est moins que 60 !")
  })

  it('should tell when the given number is exact', () => {
    let input = getByLabelText(container, /entrez un nombre/i)

    input.value = 50
    fireEvent.submit(form)
    expect(result).toHaveTextContent(/gagné/i)
  })
})
