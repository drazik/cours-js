import * as PostsList from "./PostsList"
import {
  getByRole,
  getByText,
  waitFor,
  queryByRole,
} from "@testing-library/dom"
import fetchMock from "jest-fetch-mock"

const getDOM = () => {
  return document.createElement("section")
}

const setup = () => {
  const dom = getDOM()
  const postsList = PostsList.init(dom)

  return { dom, postsList }
}

const posts = [
  { id: 1, body: "This is post 1" },
  { id: 2, body: "This is post 2" },
]

describe("init", () => {
  test.skip("shows a spinner when mounted", () => {
    const { dom } = setup()

    expect(getByRole(dom, "status", { name: "loading" })).not.toBeNull()
  })

  test.skip("requests posts from API when mounted", () => {
    setup()

    expect(fetch).toHaveBeenLastCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    )
  })

  test.skip("shows received posts when the API returns a successful response", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts))

    const { dom } = setup()

    await waitFor(() => {
      posts.forEach((post) => {
        expect(getByText(dom, post.body)).not.toBeNull()
      })
    })
  })

  test.skip("show an error message when the API returns an error response", async () => {
    fetchMock.mockRejectOnce({ ok: false })

    const { dom } = setup()

    await waitFor(() => {
      expect(getByText(dom, "Une erreur est survenue.")).not.toBeNull()
    })
  })
})

describe("preprend", () => {
  test.skip("it creates a post element and prepends it to the list", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts))

    const { dom, postsList } = setup()

    await waitFor(() => {
      expect(queryByRole(dom, "status", { name: "loading" })).toBeNull()
    })

    postsList.prepend({ id: 101, body: "New post" })

    const element = getByText(dom, "New post").parentElement.parentElement

    expect(element).not.toBeNull()
    expect(element).toBe(dom.firstElementChild)
  })
})
