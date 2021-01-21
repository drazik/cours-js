import { generateRandomNumber } from "./utils.js"

/**
 * Initialise une partie du jeu
 *
 * @param {HTMLElement} container - L'élément racine du widget de jeu
 * @param {object} options
 * @param {number} options.min - La valeur minimale du nombre aléatoire
 * @param {number} options.max - La valeur maximale du nombre aléatoire
 */
export const initGame = (container, options = {}) => {
  const { min = 1, max = 100 } = options

  const form = container.querySelector(".js-game-form")
  const input = form.querySelector(".js-game-input")
  const submitButton = form.querySelector("button[type='submit']")
  const result = container.querySelector(".js-game-result")
  const resetButton = container.querySelector(".js-game-reset")

  // 👉 Générer un nombre aléatoire entre min et max et le stocker dans
  // une variable `number`
  const number = generateRandomNumber(min, max)

  /**
   * Vérifie la valeur donnée lors d'une tentative et affiche le résultat
   */
  const checkGuess = () => {
    // 👉 Récupérer la valeur saisie par l'utilisateur
    // Celle-ci sera une string, il faudra donc la caster en number
    // (voir la fonction `parseInt`)
    const guess = Number(input.value)

    // 👉 Si le nombre saisi et `number` sont égaux,
    // exécuter la fonction `handleWin`
    if (guess === number) {
      handleWin()
    }

    // 👉 Si le nombre saisi est inférieur à `number`,
    // exécuter la fonction `handleIsLowerThanExpected`
    if (guess < number) {
      handleIsLowerThanExpected(guess)
    }

    // 👉 Si le nombre saisi est supérieur à `number`,
    // exécuter la fonction `handleIsHigherThanExpected`
    if (guess > number) {
      handleIsHigherThanExpected(guess)
    }
  }

  const handleWin = () => {
    result.textContent = "Gagné ! 🎉"
    resetButton.hidden = false
    resetButton.focus()

    input.disabled = true
    submitButton.disabled = true
  }

  /**
   * @param {number} guess - Le nombre saisit par l'utilisateur
   */
  const handleIsLowerThanExpected = (guess) => {
    result.textContent = `C'est plus que ${guess} !`
  }

  /**
   * @param {number} guess - Le nombre saisit par l'utilisateur
   */
  const handleIsHigherThanExpected = (guess) => {
    result.textContent = `C'est moins que ${guess} !`
  }

  /**
   * @param {Event} event - L'événement levé par la soumission du formulaire
   */
  const handleSubmit = (event) => {
    event.preventDefault()

    // 👉 Exécuter la fonction checkGuess
    checkGuess()

    // 👉 Vider la valeur saisie dans `input`
    input.value = ""
  }

  const init = () => {
    resetButton.hidden = true
    result.innerHTML = ""
    input.value = ""
    input.disabled = false
    input.focus()
    submitButton.disabled = false

    form.addEventListener("submit", handleSubmit)
    resetButton.addEventListener("click", reset)
  }

  const reset = () => {
    form.removeEventListener("submit", handleSubmit)
    resetButton.removeEventListener("click", reset)
    initGame(container, { min, max })
  }

  init()
}
