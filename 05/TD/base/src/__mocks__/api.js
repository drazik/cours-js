const api = jest.createMockFromModule("../api.js")

api.fetchForecastForCity = (city) => {
  if (city === "Paris") {
    return Promise.resolve({
      city: { name: city },
      forecasts: [
        {
          dt_txt: "2021-02-18 18:00:00",
          main: {
            feels_like: 5.47,
            temp: 8.68,
          },
          weather: [
            {
              icon: "10n",
            },
          ],
          wind: {
            speed: 1,
          },
        },
        {
          dt_txt: "2021-02-18 21:00:00",
          main: {
            feels_like: 4.47,
            temp: 7.68,
          },
          weather: [
            {
              icon: "10n",
            },
          ],
          wind: {
            speed: 2,
          },
        },
        {
          dt_txt: "2021-02-19 00:00:00",
          main: {
            feels_like: 3.47,
            temp: 6.68,
          },
          weather: [
            {
              icon: "10n",
            },
          ],
          wind: {
            speed: 3,
          },
        },
      ],
    })
  }

  return Promise.reject(new Error("La ville demandée est introuvable"))
}

const { fetchForecastForCity } = api

export { fetchForecastForCity }
