import { getArtistInfo } from "./api.js"

/**
 * Initialise le formulaire de recherche
 *
 * @param {HTMLFormElement} formElement
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export function initSearchForm(formElement, onSuccess, onError, onLoading) {
  // Récupérer l'élément qui porte l'ID artist-name dans formElement
  // let input = ...

  // Récupérer l'élément qui porte un attribut type avec la valeur "submit"
  // dans formElement
  // let submitButton = ...

  // Disable submitButton si la valeur trimmée de l'input est vide
  // ...

  formElement.addEventListener("submit", handleSubmit)
  input.addEventListener("input", handleInput)

  function handleSubmit(e) {
    // Empêcher le comportement par défaut du navigateur pour cet événement
    // ...

    // Disable submitButton
    // ...

    // Appeler la fonction onLoading
    // ...

    try {
      // Appeler la fonction getArtistInfo en lui passant la valeur trimmée de l'input
      // ...

      // Appeler la fonction onSuccess en lui passant le résultat de getArtistInfo
      // ...
      
      // Vider la valeur de input
      // ...
    } catch (err) {
      // Appeler la fonction onError en lui passant la propriété message de err
      // ...
    } finally {
      // Disable submitButton si la valeur de l'input est vide
      // ...
    }
  }

  function handleInput() {
    // Disable submitButton si la valeur trimmée de l'input est vide
    // ...
  }
}
