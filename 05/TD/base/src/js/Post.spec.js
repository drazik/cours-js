import * as Post from "./Post"
import { getByText } from "@testing-library/dom"

describe("create", () => {
  test.skip("creates a post from given data", () => {
    const post = Post.create({ body: "This is post content" })

    expect(getByText(post, "This is post content")).not.toBeNull()
  })
})
