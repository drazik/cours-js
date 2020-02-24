const BASE_URL = 'http://localhost:3000'

function getEndpointURL(endpoint) {
  return `${BASE_URL}${endpoint}`
}

export async function getPosts() {
  // 👉 Faire une requête sur l'URL http://localhost:3000/posts grâce à fetch
  let url = getEndpointURL('/posts')
  let response = await fetch(url)

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}

export async function createPost(post) {
  // 👉 Faire une requête POST sur l'URL http://localhost:3000/posts grâce à
  // fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/23)
  let url = getEndpointURL('/posts')
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}

export async function deletePost(post) {
  // 👉 Faire une requête DELETE sur l'URL
  // http://localhost:3000/posts/{id du post} grâce à fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/25)
  let url = getEndpointURL(`/posts/${post.id}`)
  await fetch(url, {
    method: 'DELETE',
  })
}

export async function createComment(post, comment) {
  // 👉 Faire une requête POST sur l'URL
  // http://localhost:3000/posts/{id du post}/comments grâce à fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/23)
  let url = getEndpointURL(`/posts/${post.id}/comments`)
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}

export async function deleteComment(post, comment) {
  // 👉 Faire une requête DELETE sur l'URL
  // http://localhost:3000/posts/{id du post}/comments/{id du commentaire}
  // grâce à fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/25)
  let url = getEndpointURL(`/posts/${post.id}/comments/${comment.id}`)
  await fetch(url, {
    method: 'DELETE',
  })
}
