import React, { useState, useEffect } from 'react'
import { getPosts } from './api.js'

// Importer le composant AddPostForm
import { AddPostForm } from "./AddPostForm"

// Importer le composant PostsList
import { PostsList } from "./PostsList"

export function App() {
  // Créer un state ayant pour valeur par défaut un tableau vide
  let [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let posts = await getPosts()

      // Modifier le state pour y mettre les posts
      setPosts(posts)
    }

    fetchPosts()
  }, [])

  function handleSuccess(newPost) {
    // Modifier le state pour y mettre un nouveau tableau contenant le nouveau post
    // ainsi que les autres posts
    setPosts(prevPosts => [...prevPosts, newPost])
  }

  return (
    <>
      <header>
        <h1 className="title">Timeline</h1>
      </header>
      <div className="wrapper">
        <AddPostForm onSuccess={handleSuccess} onError={err => console.log(err)} />
        <PostsList posts={posts} />
      </div>
    </>
  )
}
