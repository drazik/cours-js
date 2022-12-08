import { worker } from "./mocks/browser"
import * as PostsList from "./posts-list"

worker.start()

const postsListRoot = document.querySelector("[data-component='posts-list']")

if (postsListRoot === null) {
	throw new Error("Couldn't find posts list root")
}

PostsList.init(postsListRoot)
