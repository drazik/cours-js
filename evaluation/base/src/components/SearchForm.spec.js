import { screen, fireEvent, waitFor } from "@testing-library/dom"
import * as SearchForm from "./SearchForm"
import userEvent from "@testing-library/user-event"

const setup = () => {
  const formElement = document.createElement("form")
  formElement.innerHTML = `
    <label for="artist-name">Nom de l'artiste</label>
    <input id="artist-name" name="artist[name]" type="text" />
    <button type="submit">Rechercher</button>
  `

  const onLoading = jest.fn()
  const onError = jest.fn()
  const onSuccess = jest.fn()
  const form = SearchForm.init(formElement, { onLoading, onError, onSuccess })

  document.body.append(formElement)

  return { form, formElement, onLoading, onError, onSuccess }
}

const getArtistNameField = () => {
  return screen.getByRole("textbox", { name: "Nom de l'artiste" })
}

const getSubmitButton = () => {
  return screen.getByRole("button", { name: "Rechercher" })
}

const cleanup = () => {
  document.body.innerHTML = ""
}

const artist = {
  name: "Daft Punk",
  tags: [
    { name: "electronic", url: "https://www.last.fm/tags/electronic" },
    { name: "dance", url: "https://www.last.fm/tags/dance" },
    { name: "House", url: "https://www.last.fm/tags/House" },
    { name: "electronica", url: "https://www.last.fm/tags/electronica" },
    { name: "techno", url: "https://www.last.fm/tags/techno" },
  ],
  bio: {
    summary:
      "Daft Punk est un groupe français de musique électronique, originaire de Paris. Actifs depuis 1993, Thomas Bangalter et Guy-Manuel de Homem-Christo, les deux membres, ont allié à leurs sons electro, house et techno des tonalités rock, groove et disco. Le groupe participa à la création et à la démocratisation du mouvement de musique électronique baptisé French Touch. Ils font partie des artistes français s'exportant le mieux à l'étranger, et ce depuis la sortie de leur premier véritable succès, Da Funk en 1996.",
  },
  similar: ["Justice", "Stardust", "Thomas Bangalter", "Modjo", "Cassius"],
}

afterEach(cleanup)

describe("init", () => {
  describe("lorsque le champ de saisie est vide", () => {
    it("le bouton d'envoi doit être désactivé", () => {
      setup()

      expect(getSubmitButton()).toBeDisabled()
    })
  })

  describe("lorsque l'utilisateur tape quelque chose dans le champ de saisie", () => {
    describe("lorsque le champ de saisie contient uniquement des espaces", () => {
      it("le bouton d'envoi doit être désactivé", () => {
        setup()

        userEvent.type(getArtistNameField(), "   ")

        expect(getSubmitButton()).toBeDisabled()
      })
    })

    describe("lorsque le champ de saisie contient autre chose que des espaces", () => {
      it("le bouton d'envoi doit être activé", () => {
        setup()

        userEvent.type(getArtistNameField(), "daft punk")

        expect(getSubmitButton()).toBeEnabled()
      })
    })
  })

  describe("lorsque l'utilisateur envoie le formulaire", () => {
    it("le comportement par défaut du navigateur doit être empêché", (done) => {
      fetch.mockResponseOnce(JSON.stringify(artist))

      /**
       * @param {Event} e
       */
      const handleSubmit = (e) => {
        expect(e.defaultPrevented).toBe(true)
        document.body.removeEventListener("submit", handleSubmit)
        done()
      }

      document.body.addEventListener("submit", handleSubmit)

      const { formElement } = setup()

      userEvent.type(getArtistNameField(), "daft punk")
      fireEvent.submit(formElement)
    })

    it("la fonction onLoading doit être appelée", async () => {
      fetch.mockResponseOnce(JSON.stringify(artist))

      const { onLoading } = setup()

      userEvent.type(getArtistNameField(), "daft punk")
      userEvent.click(getSubmitButton())

      expect(onLoading).toHaveBeenCalled()
    })

    describe("lorsque le serveur renvoie une erreur 404", () => {
      it("la fonction onError doit être appelée avec le message d'erreur 'Artiste introuvable'", async () => {
        fetch.mockResponseOnce(null, { status: 404 })

        const { onError } = setup()

        userEvent.type(getArtistNameField(), "existepas")
        userEvent.click(getSubmitButton())

        await waitFor(() => {
          expect(onError).toHaveBeenCalledWith("Artiste introuvable")
        })
      })
    })

    describe("lorsque le serveur renvoie une erreur quelconque", () => {
      it("la fonction onError doit être appelée avec le message d'erreur 'Erreur inconnue'", async () => {
        fetch.mockResponseOnce(null, { status: 500 })

        const { onError } = setup()

        userEvent.type(getArtistNameField(), "existepas")
        userEvent.click(getSubmitButton())

        await waitFor(() => {
          expect(onError).toHaveBeenCalledWith("Erreur inconnue")
        })
      })
    })

    describe("lorsque le serveur renvoie les données de l'artiste", () => {
      it("la fonction onSuccess doit être appelée avec les données de l'artiste", async () => {
        fetch.mockResponseOnce(JSON.stringify(artist))

        const { onSuccess } = setup()

        userEvent.type(getArtistNameField(), "daft punk")
        userEvent.click(getSubmitButton())

        await waitFor(() => {
          expect(onSuccess).toHaveBeenCalledWith(artist)
        })
      })
    })
  })
})
