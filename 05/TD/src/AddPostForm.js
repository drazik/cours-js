import { createPost } from './api.js'
import React, { useState } from 'react'

export function AddPostForm(props) {
  // Créer un state "status" avec pour valeur initiale 'writing'
  // let [status, setStatus] = ...

  // Créer un state "author" avec pour valeur initiale une string vide
  // ...

  // Créer un state "content" avec pour valeur initiale une string vide
  // ...

  async function handleSubmit(e) {
    e.preventDefault()

    // Modifier le state status pour y mettre la string 'loading'
    // setStatus(...)

    try {
      let post = await createPost({
        author,
        content
      })


      // Appeler la fonction props.onSuccess en lui passant le post créé
      // ...
    } catch (err) {
      // Appeler la fonction props.onError en lui passant l'erreur
      // ...
    } finally {
      // Modifier le state status pour y mettre la string 'writing'
      // ...

      // Modifier le state content pour y mettre une chaîne vide
      // ...
    }
  }

  return (
    <form className="add-post-form js-add-post-form" onSubmit={handleSubmit}>
      <div className="field stack">
        <label htmlFor="post-author" className="field__label">Who are you?</label>
        <input
          id="post-author"
          type="text"
          className="field__input"
          placeholder="I am... somebody"
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div className="field stack">
        <label htmlFor="post-content" className="field__label">What's on your mind?</label>
        <input
          id="post-content"
          type="text"
          className="field__input"
          placeholder="Something interesting"
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="button" disabled={status === 'loading'}>
        Send
      </button>
    </form>
  )
}
