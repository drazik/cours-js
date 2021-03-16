import * as Artist from "./Artist"
import { screen } from "@testing-library/dom"

const setup = () => {
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

  const element = Artist.make(artist)
  document.body.append(element)

  return { element, artist }
}

const cleanup = () => {
  document.body.innerHTML = ""
}

afterEach(cleanup)

describe("Artist.make", () => {
  it("le nom de l'artiste doit être visible dans un élément de titre de niveau 1", () => {
    setup()

    expect(
      screen.getByRole("heading", { level: 1, name: "Daft Punk" })
    ).toBeInTheDocument()
  })

  it("les tags de l'artiste doivent être visibles dans une liste", () => {
    const { artist } = setup()

    artist.tags.forEach((tag) => {
      expect(
        screen.getByRole("listitem", { name: tag.name })
      ).toBeInTheDocument()
    })
  })

  it("les tags de l'artiste doivent être des liens menant à la page correspondant au tag sur last.fm", () => {
    const { artist } = setup()

    artist.tags.forEach((tag) => {
      expect(screen.getByRole("link", { name: tag.name })).toHaveAttribute(
        "href",
        tag.url
      )
    })
  })

  it("le résumé de la biographie de l'artiste doit être visible", () => {
    const { artist } = setup()

    expect(screen.getByText(artist.bio.summary)).toBeInTheDocument()
  })

  it("les artistes similaires doivent être visibles dans une liste", () => {
    const { artist } = setup()

    artist.similar.forEach((similar) => {
      expect(
        screen.getByRole("listitem", { name: similar })
      ).toBeInTheDocument()
    })
  })
})
