import {
  fireEvent,
  getByRole,
  waitFor,
  queryByRole,
} from "@testing-library/dom"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import * as PostForm from "./PostForm"
import fetchMock from "jest-fetch-mock"

const getDOM = () => {
  const form = document.createElement("form")

  form.innerHTML = `
  <div>
    <label for="body" class="form-label">
      What's on your head right now?
    </label>
    <textarea
      class="form-control"
      id="body"
      name="body"
      placeholder="Spread your thoughts all over the world..."
    ></textarea>
  </div>
  <div>
    <button type="submit" class="btn btn-primary">Publish</button>
  </div>
`

  return form
}

const setup = (options) => {
  const dom = getDOM()
  document.body.append(dom)

  PostForm.init(dom, options)

  return dom
}

afterEach(() => {
  document.body.innerHTML = ""
})

test.skip("submit button is disabled by default", () => {
  const dom = setup()

  expect(getByRole(dom, "button", { name: "Publish" })).toBeDisabled()
})

test.skip("submit button is disabled if input contains only spaces", () => {
  const dom = setup()
  const textarea = getByRole(dom, "textbox")

  fireEvent.input(textarea, { target: { value: "\n   \n" } })

  expect(getByRole(dom, "button", { name: "Publish" })).toBeDisabled()
})

test.skip("submit button is enabled if input contains not only spaces", () => {
  const dom = setup()
  const textarea = getByRole(dom, "textbox")

  fireEvent.input(textarea, { target: { value: "Hello world" } })

  expect(getByRole(dom, "button", { name: "Publish" })).not.toBeDisabled()
})

test.skip("submit button is disabled while request is ongoing", () => {
  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
})

test.skip("submitting the form sends a request to the API", () => {
  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  expect(fetch).toHaveBeenLastCalledWith(
    "https://jsonplaceholder.typicode.com/posts",
    {
      body: JSON.stringify({ body: "Hello world" }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "post",
    }
  )
})

test.skip("body field value is resetted when API returns a successful response", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ id: 101, body: "Hello world" }))

  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(textarea).toHaveValue("")
  })
})

test.skip("onSuccess option is called when API returns a successful response", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ id: 101, body: "Hello world" }))

  const onSuccess = jest.fn()
  const dom = setup({ onSuccess })
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledWith({ id: 101, body: "Hello world" })
  })
})

test.skip("an error message is shown when API returns an error response", async () => {
  fetchMock.mockRejectOnce()

  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(getByRole(dom, "alert")).toHaveTextContent("Une erreur est survenue")
  })
})

test.skip("submit button is enabled when API returns an error response", async () => {
  fetchMock.mockRejectOnce()

  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled()
  })
})

test.skip("when form is submitted, alert message is closed", async () => {
  fetchMock.mockRejectOnce()
  fetchMock.mockResponseOnce(JSON.stringify({ id: 101, body: "Hello world" }))

  const dom = setup()
  const textarea = getByRole(dom, "textbox")
  const submitButton = getByRole(dom, "button", { name: "Publish" })

  fireEvent.input(textarea, { target: { value: "Hello world" } })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(queryByRole(dom, "alert")).not.toBeNull()
  })

  fetchMock.mockResponseOnce(JSON.stringify({ id: 101, body: "Hello world" }))

  userEvent.click(submitButton)

  await waitFor(() => {
    expect(queryByRole(dom, "alert")).toBeNull()
  })
})
