import { getByRole, queryByRole } from "@testing-library/dom"
import "@testing-library/jest-dom"
import * as Spinner from "./Spinner"

describe("create", () => {
  test("creates the spinner element", () => {
    const spinner = Spinner.create()
    const dom = document.createElement("div")
    dom.append(spinner.element)

    expect(getByRole(dom, "status", { name: /loading/i })).not.toBeNull()
  })
})

describe("show", () => {
  test("shows the spinner in the given element", () => {
    const spinner = Spinner.create()
    const container = document.createElement("div")

    spinner.show(container)

    expect(getByRole(container, "status", { name: /loading/i })).not.toBeNull()
  })
})

describe("remove", () => {
  test("removes the spinner from the DOM", () => {
    const spinner = Spinner.create()
    const container = document.createElement("div")

    spinner.show(container)
    spinner.remove()

    expect(queryByRole(container, "status")).toBeNull()
  })
})
