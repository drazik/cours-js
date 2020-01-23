import { generateRandomNumber } from './utils.js'

/**
 * Initialise une partie du jeu
 *
 * @param {HTMLFormElement} form - L'élément HTML du formulaire du jeu
 * @param {HTMLParagraphElement} result - L'élément HTML où afficher le résultat de chaque tentative
 * @param {Number} min - La valeur minimale du nombre aléatoire
 * @param {Number} maxx - La valeur maximale du nombre aléatoire
 */
export function initGame(form, result, min, max) {
  let input = form.querySelector('input')

  // Générer un nombre aléatoire entre min et max et le stocker dans une variable `number`
  // let number = ...

  /**
   * Gère la soumission d'une tentative
   *
   * @param {Event} event - L'événement levé par la soumission du formulaire
   */
  function handleGuessSubmit(event) {
    event.preventDefault()

    // Récupérer la valeur entrée dans `input`
    // let guess = ...

    // Lancer la vérification de la valeur entrée par l'utilisateur

    // Vider la valeur saisie dans `input`
    // input.value = ...
  }

  /**
   * Vérifie la valeur donnée lors d'une tentative et affiche le résultat
   *
   * @param {Number} guess - La valeur donnée lors de la tentative
   */
  function checkGuess(guess) {
    // Si guess et number sont égaux, appeler la fonction handleWin
    // puis la fonction reset
    if (/* ... */) {
      // ...
    }

    // Si guess est inférieur à number, appeler la fonction handleHigher
    if (/* ... */) {
      // ...
    }

    // Si guess est supérieur à number, appeler la fonction handleLower
    if (/* ... */) {
      // ...
    }
  }

  /**
   * Initialise une nouvelle tentative
   */
  function reset() {
    form.removeEventListener('submit', handleGuessSubmit)
    initGame(form, result, min, max)
  }

  form.addEventListener('submit', handleGuessSubmit)
}

/**
 * Gère l'affichage lorsque la tentative est valide
 *
 * @param {HTMLParagraphElement} result - L'élément dans lequel
 * afficher le résultat
 */
function handleWin(result) {
  // Afficher la chaîne 'Gagné ! 🎉' dans result
}

/**
 * Gère l'affichage lorsque la tentative est inférieure à la valeur à trouver
 *
 * @param {HTMLParagraphElement} result - L'élément dans lequel afficher
 * le résultat
 */
function handleHigher(result, guess) {
  // Afficher la chaîne `C'est plus que ${guess}` dans result
}

/**
 * Gère l'affichage lorsque la tentative est supérieure à la valeur à trouver
 *
 * @param {HTMLParagraphElement} result - L'élément dans lequel afficher
 * le résultat
 */
function handleLower(result, guess) {
  // Afficher la chaîne `C'est moins que ${guess}` dans result
}
