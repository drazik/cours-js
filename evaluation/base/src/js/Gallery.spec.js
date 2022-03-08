import * as Gallery from "./Gallery"
import { getByAltText } from "@testing-library/dom"

describe("showImages", () => {
  test.skip("shows all images in given query result", () => {
    const root = document.createElement("ul")
    const gallery = Gallery.init(root)

    gallery.showImages(queryResult)

    queryResult.collection.items.forEach((item) => {
      const image = getByAltText(root, item.data[0].title)

      expect(image).toHaveAttribute("src", item.links[0].href)
      expect(image.parentElement).toHaveAttribute("href", item.links[0].href)
      expect(image.parentElement).toHaveAttribute("target", "_blank")
    })
  })
})

const queryResult = {
  collection: {
    items: [
      {
        data: [
          {
            title: "Weighing in on the Dumbell Nebula",
            date_created: "2011-08-10T21:00:09Z",
            description:
              "The Dumbbell nebula, also known as Messier 27, pumps out infrared light in this image from NASA Spitzer Space Telescope. Planetary nebulae are now known to be the remains of stars that once looked a lot like our sun.",
          },
        ],
        links: [
          {
            href: "https://images-assets.nasa.gov/image/PIA14417/PIA14417~thumb.jpg",
          },
        ],
      },
    ],
  },
}
