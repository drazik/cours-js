import { initAvatar } from "./avatar"
import { screen, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import "regenerator-runtime/runtime"

const setupDOM = () => {
  const root = document.createElement("div")

  root.innerHTML = `
<div class="js-avatar">
  <img data-placeholder-src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg" src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg" alt="" class="js-avatar-preview" data-testid="preview" />
  <button type="button" class="js-avatar-delete d-none">Supprimer</button>
  <label for="avatar">Avatar</label>
  <input class="js-avatar-input" id="avatar" name="avatar" type="file" />
</div>
`

  return root
}

beforeEach(() => {
  const root = setupDOM()
  document.body.append(root)

  initAvatar(root.querySelector(".js-avatar"))
})

afterEach(() => {
  cleanup()
})

const cleanup = () => {
  ;[...document.body.children].forEach((child) => child.remove())
}

describe("Lorsque le composant est initialisé", () => {
  describe("Lorsque l'input est vide", () => {
    it("la preview doit afficher l'image de placeholder", () => {
      const preview = screen.getByTestId("preview")

      expect(preview).toHaveAttribute(
        "src",
        preview.getAttribute("data-placeholder-src")
      )
    })

    it("le bouton 'supprimer' ne doit pas être visible", () => {
      expect(screen.getByText("Supprimer")).toHaveClass("d-none")
    })
  })

  describe("Lorsque l'input a une valeur", () => {
    it("la preview doit afficher l'image sélectionnée", (done) => {
      const file = new File(["hello"], "hello.png", { type: "image/png" })
      const input = screen.getByLabelText("Avatar")
      const reader = new FileReader()
      reader.addEventListener("load", async (e) => {
        const dataURL = e.target.result

        userEvent.upload(input, file)

        await waitFor(() =>
          expect(screen.getByTestId("preview")).toHaveAttribute("src", dataURL)
        )

        done()
      })

      reader.readAsDataURL(file)
    })

    it("le bouton 'supprimer' doit être visible", async () => {
      const file = new File(["hello"], "hello.png", { type: "image/png" })
      const input = screen.getByLabelText("Avatar")
      userEvent.upload(input, file)

      await waitFor(() =>
        expect(screen.getByText("Supprimer")).not.toHaveClass("d-none")
      )
    })
  })
})

describe("Lorsque l'utilisateur sélectionne un fichier", () => {
  it("la preview doit afficher l'image sélectionnée", (done) => {
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const input = screen.getByLabelText("Avatar")
    const reader = new FileReader()
    reader.addEventListener("load", async (e) => {
      const dataURL = e.target.result

      userEvent.upload(input, file)

      await waitFor(() =>
        expect(screen.getByTestId("preview")).toHaveAttribute("src", dataURL)
      )

      done()
    })

    reader.readAsDataURL(file)
  })

  it("le bouton 'supprimer' doit être visible", async () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const input = screen.getByLabelText("Avatar")
    userEvent.upload(input, file)

    await waitFor(() =>
      expect(screen.getByText("Supprimer")).not.toHaveClass("d-none")
    )
  })
})

describe("Lorsque l'utilisateur click sur le bouton 'supprimer'", () => {
  it("la preview doit afficher l'image de placeholder", async () => {
    const preview = screen.getByTestId("preview")
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const input = screen.getByLabelText("Avatar")
    userEvent.upload(input, file)

    await waitFor(() =>
      expect(preview).not.toHaveAttribute(
        "src",
        preview.getAttribute("data-placeholder-src")
      )
    )

    userEvent.click(screen.getByText("Supprimer"))

    await waitFor(() =>
      expect(preview).toHaveAttribute(
        "src",
        preview.getAttribute("data-placeholder-src")
      )
    )
  })

  it("le bouton 'supprimer' ne doit plus être visible", async () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const input = screen.getByLabelText("Avatar")
    const deleteButton = screen.getByText("Supprimer")

    userEvent.upload(input, file)

    await waitFor(() => expect(deleteButton).not.toHaveClass("d-none"))

    userEvent.click(deleteButton)

    await waitFor(() => expect(deleteButton).toHaveClass("d-none"))
  })

  it("l'input ne doit plus contenir de fichier", async () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const deleteButton = screen.getByText("Supprimer")

    userEvent.upload(screen.getByLabelText("Avatar"), file)

    await waitFor(() =>
      expect(screen.getByLabelText("Avatar").files).toHaveLength(1)
    )

    userEvent.click(deleteButton)

    await waitFor(() =>
      expect(screen.getByLabelText("Avatar").files).toHaveLength(0)
    )
  })
})
