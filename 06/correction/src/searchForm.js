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
  let input = formElement.querySelector("#artist-name")

  // Récupérer l'élément qui porte un attribut type avec la valeur "submit"
  // dans formElement
  let submitButton = formElement.querySelector("[type='submit']")

  function getValue() {
    return input.value.trim()
  }

  function hasValue() {
    return getValue() !== ""
  }

  function updateSubmitState() {
    submitButton.disabled = !hasValue()
  }

  // Disable submitButton si la valeur trimmée de l'input est vide
  updateSubmitState()

  formElement.addEventListener("submit", handleSubmit)
  input.addEventListener("input", handleInput)

  async function handleSubmit(e) {
    // Empêcher le comportement par défaut du navigateur pour cet événement
    e.preventDefault()

    // Disable submitButton
    submitButton.disabled = true

    // Appeler la fonction onLoading
    onLoading()

    try {
      // Appeler la fonction getArtistInfo en lui passant la valeur trimmée de l'input
      let artistInfo =  await getArtistInfo(getValue())

      // Appeler la fonction onSuccess en lui passant le résultat de getArtistInfo
      onSuccess(artistInfo)
      
      // Vider la valeur de input
      input.value = ""
    } catch (err) {
      // Appeler la fonction onError en lui passant la propriété message de err
      onError(err.message)
    } finally {
      // Disable submitButton si la valeur de l'input est vide
      updateSubmitState()
    }
  }

  function handleInput() {
    // Disable submitButton si la valeur trimmée de l'input est vide
    updateSubmitState()
  }
}
