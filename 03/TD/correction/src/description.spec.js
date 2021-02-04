import { initDescription } from "./description"
import { screen, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const setupDOM = (initialValue = "") => {
  const root = document.createElement("div")

  root.innerHTML = `
<div class="js-description">
  <label for="description" class="js-description-label">Description</label>
  <textarea maxlength="1000" id="description" name="description" class="js-description-input">${initialValue}</textarea>
</div>
`

  return root
}

const init = (initialValue) => {
  const root = setupDOM(initialValue)
  document.body.append(root)

  initDescription(root.querySelector(".js-description"))
}

afterEach(() => {
  cleanup()
})

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("Lorsque le composant est initialisé", () => {
  describe("lorsque l'input contient du texte", () => {
    it("l'indicateur doit refléter le nombre de caractères restants", () => {
      init("Hello world")
      expect(screen.getByText("(989 caractères restants)")).toBeInTheDocument()
    })
  })

  describe("lorsque l'input ne contient pas de texte", () => {
    it("l'indicateur doit refléter le nombre de caractères restants", () => {
      init()
      expect(screen.getByText("(1000 caractères restants)")).toBeInTheDocument()
    })
  })
})

describe("Lorsque l'utilisateur saisit du texte", () => {
  it("l'indicateur doit se mettre à jour", () => {
    init()
    userEvent.type(screen.getByLabelText(/Description/), "Hello world")

    expect(screen.getByText("(989 caractères restants)")).toBeInTheDocument()
  })
})
