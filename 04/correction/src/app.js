import { initAddPostForm } from './addPostForm.js'
import { initPostsList } from './postsList.js'

let addPostFormElement = document.querySelector('.js-add-post-form')
let postsListElement = document.querySelector('.js-posts-list')

let postsList = initPostsList(postsListElement)
let addPostForm = initAddPostForm(addPostFormElement, postsList.add)
