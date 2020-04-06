import { getArtistInfo, BASE_URL } from "./api.js"
import data from "./data.json"

let fatFreddysDropData = data["fat freddy's drop"]
let mockSuccess = Promise.resolve({
  json: () => Promise.resolve(fatFreddysDropData)
})

let apiError = {
  "error": 6,
  "message": "The artist you supplied could not be found",
  "links": []
}
let mockError = Promise.resolve({
  json: () => Promise.resolve(apiError)
})

window.fetch = jest.fn()

afterEach(() => {
  window.fetch.mockReset()
})

describe("getArtistInfo", () => {
  describe("when the lastfm api returns data", () => {
    it("should call lastfm's artist.getinfo with the good params", async () => {
      window.fetch.mockResolvedValue(mockSuccess)

      await getArtistInfo("Fat Freddy's Drop")
      expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}&method=artist.getinfo&artist=fat freddy's drop`)
    })

    it("should return the data as an object", async () => {
      window.fetch.mockResolvedValue(mockSuccess)

      let data = await getArtistInfo("Fat Freddy's Drop")
      expect(data).toEqual(fatFreddysDropData)
    })
  })

  describe("when the lastfm api returns an error", () => {
    it("should throw an error with the message returned by the server", async () => {
      window.fetch.mockResolvedValue(mockError)
      expect.assertions(1)

      try {
        await getArtistInfo("existepas")
      } catch (err) {
        expect(err.message).toBe(apiError.message)
      }
    })
  })
})
