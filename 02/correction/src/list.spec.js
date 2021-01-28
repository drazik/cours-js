import { initList } from "./list"
import { screen, getByLabelText } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const setupDOM = () => {
  const root = document.createElement("ul")

  return root
}

let list

beforeEach(() => {
  const listElement = setupDOM()
  document.body.append(listElement)

  list = initList(listElement)
})

afterEach(() => cleanup())

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("initList", () => {
  describe("addItem", () => {
    it("doit ajouter un nouvel item dans la liste avec le label donné", () => {
      list.addItem("farine")

      expect(screen.getByLabelText("farine")).toBeInTheDocument()
    })
  })

  describe("Lorsque l'utilisateur coche un élément", () => {
    it("l'élément doit apparaître comme étant sélectionné", () => {
      list.addItem("farine")

      const checkbox = screen.getByLabelText("farine")
      userEvent.click(checkbox)

      expect(checkbox.parentNode.parentNode).toHaveClass("list__item--selected")
    })
  })

  describe("Lorsque l'utilisateur supprime un élément", () => {
    it("l'élément ne doit plus apparaître", () => {
      list.addItem("farine")

      const checkbox = screen.getByLabelText("farine")
      const item = checkbox.parentNode.parentNode
      const removeButton = getByLabelText(item, "Supprimer")

      userEvent.click(removeButton)

      expect(screen.queryByLabelText("farine")).not.toBeInTheDocument()
    })
  })
})
