export function initAddPostForm(formElement, onSuccess) {
  let authorInput = formElement.querySelector('#post-author')
  let contentInput = formElement.querySelector('#post-content')
  let submitButton = formElement.querySelector('[type="submit"]')

  function handleSubmit(e) {
    // Empêcher le comportement par défaut du navigateur lors du submit
    // d'un formulaire
    // ...

    // Désactiver submitButton
    // ...

    // Appeler la fonction createPost du module api.js en lui passant
    // un objet contenant les propriétés { author, content } ayant
    // respectivement pour valeur la valeur de authorInput et la valeur
    // de contentInput
    // ...

    // Passer la valeur de retour de createPost à la fonction onSuccess
    // ...
    
    // Réactiver submitButton
    // ...

    // Vider la valeur de contentInput
    // ...
  }

  // Ajouter un event listener sur formElement pour le type 'submit'
  // et la fonction handleSubmit
  formElement.addEventListener('submit', handleSubmit)
}
