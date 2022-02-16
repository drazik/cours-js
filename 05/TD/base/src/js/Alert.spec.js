import { getByRole, queryByRole } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import * as Alert from "./Alert"

const getDOM = () => {
  const element = document.createElement("div")
  element.innerHTML = `
<div class="alert alert-error alert-dismissible" role="alert">
  This is an error message
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
</div>
`

  return element.firstElementChild
}

describe("init", () => {
  test("the element is removed when closed", () => {
    const dom = getDOM()
    const alert = Alert.init(dom)

    userEvent.click(getByRole(alert.element, "button", { name: "close" }))

    expect(queryByRole(alert.element, "alert")).toBe(null)
  })

  test("calling the close function removes the element", () => {
    const dom = getDOM()
    const alert = Alert.init(dom)

    alert.close()

    expect(queryByRole(alert.element, "alert")).toBe(null)
  })
})

describe("create", () => {
  test.skip("the element is created", () => {
    const alert = Alert.create({
      variant: "error",
      message: "This is an error message",
    })

    const dom = document.createElement("div")
    dom.append(alert)

    expect(getByRole(dom, "alert")).toBe(alert)
  })
})
