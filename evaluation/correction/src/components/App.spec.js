import * as App from "./App"
import { screen, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"

const setup = () => {
  const exampleDOM = document.createElement("div")
  exampleDOM.innerHTML = `
    <form>
      <label for="artist-name">Nom de l'artiste</label>
      <input type="text" id="artist-name" name="artistName" />
      <button type="submit">Rechercher</button>
    </form>
    <div id="result"></div>
  `

  const app = App.init(exampleDOM)
  document.body.append(exampleDOM)

  return { app }
}

const cleanup = () => {
  document.body.innerHTML = ""
}

afterEach(cleanup)

const getArtistNameField = () => {
  return screen.getByRole("textbox", { name: "Nom de l'artiste" })
}

const getSubmitButton = () => {
  return screen.getByRole("button", { name: "Rechercher" })
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

describe("lorsque l'utilisateur envoie le formulaire", () => {
  it("le message de chargement doit s'afficher", async () => {
    fetch.mockResponseOnce(JSON.stringify(artist))

    setup()

    userEvent.type(getArtistNameField(), "daft punk")
    userEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(screen.getByText("Chargement en cours...")).toBeInTheDocument()
    })
  })
})

describe("lorsque le serveur répond avec des données", () => {
  it("les données de l'artiste doivent s'afficher", async () => {
    fetch.mockResponseOnce(JSON.stringify(artist))

    setup()

    userEvent.type(getArtistNameField(), "daft punk")
    userEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(screen.getByText(artist.name)).toBeInTheDocument()
      expect(screen.getByText(artist.bio.summary)).toBeInTheDocument()

      artist.tags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument()
      })

      artist.similar.forEach((similar) => {
        expect(screen.getByText(similar)).toBeInTheDocument()
      })
    })
  })
})

describe("lorsque le serveur répond avec une erreur 404", () => {
  it("le message 'Artiste introuvable' doit s'afficher", async () => {
    fetch.mockResponseOnce(null, { status: 404 })

    setup()

    userEvent.type(getArtistNameField(), "existepas")
    userEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(screen.getByText("Artiste introuvable")).toBeInTheDocument()
    })
  })
})

describe("lorsque le serveur répond avec une erreur non 404", () => {
  it("le message 'Erreur inconnue' doit s'afficher", async () => {
    fetch.mockResponseOnce(null, { status: 500 })

    setup()

    userEvent.type(getArtistNameField(), "existepas")
    userEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(screen.getByText("Erreur inconnue")).toBeInTheDocument()
    })
  })
})
