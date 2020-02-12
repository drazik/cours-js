import { createPost } from './api.js'

export function initAddPostForm(addPostFormElement, onCreatePost) {
  let authorInput = addPostFormElement.querySelector('.js-add-post-form-author')
  let contentInput = addPostFormElement.querySelector('.js-add-post-form-content')
  let errorElement = addPostFormElement.querySelector('.js-add-post-form-error')
  let submitButton = addPostFormElement.querySelector('.js-add-post-form-submit')

  function handleSubmit(e) {
    e.preventDefault()

    onLoading()

    createPost({
      author: authorInput.value,
      content: contentInput.value
    })
      .then(onCreatePost)
      .then(() => (submitButton.disabled = false))
      .catch(onError)
      .then(() => (submitButton.disabled = false))
  }

  function onError(err) {
    errorElement.innerHTML = err
  }

  function onLoading() {
    submitButton.disabled = true
  }

  addPostFormElement.addEventListener('submit', handleSubmit)
}
