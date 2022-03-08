import * as Alerter from "./Alerter"
import { getByText, queryByText } from "@testing-library/dom"

const setup = () => {
  const root = getRootElement()
  const alerter = Alerter.init(root)

  return { root, alerter }
}

const getRootElement = () => {
  const rootElement = document.createElement("ul")
  return rootElement
}

describe("push", () => {
  test("the pushed message is visible", () => {
    const { root, alerter } = setup()
    const message = "This is an error message"

    alerter.push(message)

    expect(getByText(root, message)).not.toBeNull()
  })
})

describe("clear", () => {
  test("all messages are removed", () => {
    const { root, alerter } = setup()

    const messages = ["Message 1", "Message 2"]
    messages.forEach(alerter.push)

    alerter.clear()

    messages.forEach((message) => {
      expect(queryByText(root, message)).toBeNull()
    })
  })
})
