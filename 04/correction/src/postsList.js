function createPostElement(post) {
  let rootElement = document.createElement('article')
  rootElement.className = 'post stack stack--large'
  rootElement.id = post.id

  let headerElement = document.createElement('header')
  headerElement.className = 'post__header'

  let authorElement = document.createElement('div')
  authorElement.className = 'post__author'
  authorElement.append(post.author)

  let dateElement = document.createElement('time')
  dateElement.datetime = post.date
  dateElement.className = 'post__date'
  let date = new Date(post.date)
  dateElement.append(date.toLocaleDateString())

  headerElement.append(authorElement, dateElement)
  rootElement.append(headerElement)

  let contentElement = document.createElement('div')
  contentElement.append(post.content)

  rootElement.append(contentElement)

  return rootElement
}

export function initPostsList(postsListElement) {
  function add(post) {
    let postElement = createPostElement(post)
    postsListElement.prepend(postElement)
  }

  async function showInitialPosts() {
    // Appeler la fonction getPosts du module api.js
    // ...

    // Pour chaque post, appeler la fonction add en lui passant en paramètre le post
    // ...
  }

  showInitialPosts()

  return { add }
}
