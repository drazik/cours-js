import { fetchForecastForCity } from "./api"
import fetchMock from "jest-fetch-mock"

beforeEach(() => {
  fetchMock.resetMocks()
})

describe("fetchForecastForCity", () => {
  it("doit appeler la bonne URL", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ cod: "200", city: { name: "Paris" }, list: [] })
    )

    await fetchForecastForCity("Paris")

    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
  })

  describe("lorsque le serveur renvoie une réponse 200", () => {
    it("doit retourner un objet avec un clef city contenant les infos de la ville", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ cod: "200", city: { name: "Paris" }, list: [] })
      )

      const data = await fetchForecastForCity("Paris")

      expect(data.city).toEqual({
        name: "Paris",
      })
    })

    it("doit retourner un objet avec une clé data contenant les données de météo renvoyées par l'API", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ cod: "200", city: { name: "Paris" }, list: [] })
      )

      const data = await fetchForecastForCity("Paris")

      expect(data.forecasts).toEqual([])
    })
  })

  describe("lorsque le serveur renvoie une réponse 404", () => {
    it("doit jeter une erreur avec le message 'La ville demandée est introuvable'", async () => {
      fetch.mockResponseOnce(JSON.stringify({ cod: "404" }))

      await expect(fetchForecastForCity("Existepas")).rejects.toEqual(
        new Error("La ville demandée est introuvable")
      )
    })
  })

  describe("lorsque le serveur renvoie une réponse 401", () => {
    it("doit jeter une erreur avec le message 'Clef API invalide'", async () => {
      fetch.mockResponseOnce(JSON.stringify({ cod: "401" }))

      await expect(fetchForecastForCity("Paris")).rejects.toEqual(
        new Error("Clef API invalide")
      )
    })
  })

  describe("lorsque le serveur renvoie une autre réponse", () => {
    it("doit jeter une erreur avec le message 'Erreur inconnue'", async () => {
      fetch.mockResponseOnce(JSON.stringify({ cod: "500" }))

      await expect(fetchForecastForCity("Paris")).rejects.toEqual(
        new Error("Erreur inconnue")
      )
    })
  })
})
