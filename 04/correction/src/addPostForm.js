import { createPost } from './api.js'

export function initAddPostForm(formElement, onSuccess) {
  let authorInput = formElement.querySelector('#post-author')
  let contentInput = formElement.querySelector('#post-content')
  let submitButton = formElement.querySelector('[type="submit"]')
  let errorElement

  async function handleSubmit(e) {
    // Empêcher le comportement par défaut du navigateur lors du submit
    // d'un formulaire
    e.preventDefault()

    onLoading()

    try {
      // Appeler la fonction createPost du module api.js en lui passant
      // un objet contenant les propriétés { author, content } ayant
      // respectivement pour valeur la valeur de authorInput et la valeur
      // de contentInput
      let createdPost = await createPost({
        author: authorInput.value,
        content: contentInput.value
      })

      // Passer la valeur de retour de createPost à la fonction onSuccess
      onSuccess(createdPost)

      // Vider la valeur de contentInput
      contentInput.value = ''
    } catch (err) {
      onError(err)
    } finally {
      // Réactiver submitButton
      submitButton.disabled = false
    }
  }

  function onLoading() {
    // Désactiver le submitButton
    submitButton.disabled = true

    // Si une erreur est affichée, la supprimer
    if (errorElement) {
      errorElement.remove()
    }
  }

  function onError(err) {
    errorElement = document.createElement('p')
    errorElement.append(err.message)
    formElement.append(errorElement)
  }

  // Ajouter un event listener sur formElement pour le type 'submit'
  // et la fonction handleSubmit
  formElement.addEventListener('submit', handleSubmit)
}
