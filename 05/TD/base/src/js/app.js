import "../css/custom.scss"
import * as PostsList from "./PostsList"
import * as PostForm from "./PostForm"

const postsListElement = document.querySelector(".posts-list")
const postsList = PostsList.init(postsListElement)

const postFormElement = document.querySelector(".post-form")
PostForm.init(postFormElement, { onSuccess: postsList.prepend })
