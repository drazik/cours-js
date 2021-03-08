import * as Result from "./Result"
import { screen } from "@testing-library/dom"

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

const setup = () => {
  const exampleDOM = document.createElement("section")
  const result = Result.init(exampleDOM)

  document.body.append(exampleDOM)

  return result
}

const cleanup = () => {
  document.body.innerHTML = ""
}

afterEach(cleanup)

describe("showLoading", () => {
  it("un message de chargement doit s'afficher", () => {
    const result = setup()
    result.showLoading()

    expect(screen.getByText("Chargement en cours...")).toBeInTheDocument()
  })
})

describe("showError", () => {
  it("le message d'erreur passé en paramètre doit s'afficher", () => {
    const result = setup()
    result.showError("Artiste introuvable")

    expect(screen.getByText("Artiste introuvable")).toBeInTheDocument()
  })
})

describe("showArtist", () => {
  it("les informations de l'artiste doivent s'afficher", () => {
    const result = setup()
    result.showArtist(artist)

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
