import { fetchImages } from "./api"
import fetchMock from "jest-fetch-mock"

describe("fetchImages", () => {
  test.skip("calls the NASA images API with the good params", async () => {
    try {
      await fetchImages("earth")
    } catch (err) {
      // Intentionally does nothing
    }

    expect(fetch).toHaveBeenLastCalledWith(
      `https://images-api.nasa.gov/search?q=earth&media_type=image`
    )
  })

  describe("when the server returns a success response", () => {
    test.skip("returns the data returned by the server", async () => {
      fetchMock.mockResponseOnce(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          body: JSON.stringify(successResponse),
        })
      })

      const collection = await fetchImages("nebula")

      expect(collection).toEqual(successResponse)
    })
  })

  describe("when the server returns an error response", () => {
    test.skip("throws an error", async () => {
      fetchMock.mockResponseOnce(() => {
        return Promise.resolve({
          status: 400,
          ok: false,
        })
      })

      expect.assertions(1)

      try {
        await fetchImages("moon")
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe("when the request fails", () => {
    test.skip("throws an error", async () => {
      fetchMock.mockRejectOnce("error")

      expect.assertions(1)

      try {
        await fetchImages("jupiter")
      } catch (err) {
        expect(err).toBe("error")
      }
    })
  })
})

/** @type import("./api").QueryResult */
const successResponse = {
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
