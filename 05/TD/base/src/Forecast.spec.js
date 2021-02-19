import { Forecast } from "./Forecast.js"
import { render, screen } from "@testing-library/react"

const forecasts = [
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
]

it("doit afficher le nom de la ville", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText("Météo à Paris")).toBeInTheDocument()
})

it("doit afficher chaque date pour lesquelles on a des données", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText("Le 18/02/2021")).toBeInTheDocument()
  expect(screen.getByText("Le 19/02/2021")).toBeInTheDocument()
})

it("doit afficher l'heure pour chaque item", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText("18h")).toBeInTheDocument()
  expect(screen.getByText("21h")).toBeInTheDocument()
  expect(screen.getByText("00h")).toBeInTheDocument()
})

it("doit afficher la température", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText(/9°C/i)).toBeInTheDocument()
})

it("doit afficher la température ressentie", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText(/\(5°C ressentis\)/i)).toBeInTheDocument()
})

it("doit afficher la vitesse du vent", () => {
  render(<Forecast city={{ name: "Paris" }} forecasts={forecasts} />)

  expect(screen.getByText(/1 km\/h/i)).toBeInTheDocument()
})
