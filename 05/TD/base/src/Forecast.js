import groupBy from "lodash/groupBy"
import { Card, CardBody, CardTitle } from "./Card.js"

export const Forecast = (props) => {
  const forecastsByDay = groupForecastsByDay(props.forecasts)

  return (
    <div className="px-4 d-grid gap-5">
      {/* 👉 Afficher un titre contenant la chaîne "Météo à VILLE" (remplacer VILLE par la ville reçue dans les props )*/}

      <div className="d-grid gap-5">
        {Object.entries(forecastsByDay).map(([date, forecasts]) => (
          <ForecastDay forecasts={forecasts} date={date} key={date} />
        ))}
      </div>
    </div>
  )
}

const groupForecastsByDay = (forecasts) => {
  return groupBy(forecasts, (forecast) => forecast.dt_txt.split(" ")[0])
}

const ForecastDay = (props) => {
  const date = new Date(props.date)

  return (
    <div className="d-grid gap-2">
      {/* 👉 Afficher un titre contenant la chaîne "Le DATE" (remplacer DATE par la date formattée. La date est contenue dans la variable `date`. Voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/toLocaleDateString pour la formatter) */}

      <div className="d-flex gap-2" style={{ overflowX: "auto" }}>
        {/* 👉 Boucler sur les forecasts reçus en props, et afficher un composant `ForecastItem` pour chaque élément du tableau. Passer une prop `forecast` contenant l'item au composant `ForecastItem`. Voir https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx */}

      </div>
    </div>
  )
}

const ForecastItem = (props) => {
  const hour = getHourFromDateText(props.forecast.dt_txt)
  const weather = props.forecast.weather[0]

  return (
    <div className="flex-grow-0 flex-shrink-0" style={{ flexBasis: 250 }}>
      <Card>
        <ForecastIcon icon={weather.icon} />
        <CardBody>
          <CardTitle>{hour}h</CardTitle>
          <ul className="list-unstyled">
            <li>
              🌡 {Math.round(props.forecast.main.temp)}°C (
              {Math.round(props.forecast.main.feels_like)}
              °C ressentis)
            </li>
            <li>🍃 {Math.round(props.forecast.wind.speed)} km/h</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}

const getHourFromDateText = (dateText) => {
  const time = dateText.split(" ")[1]
  const hour = time.split(":")[0]

  return hour
}

const ForecastIcon = (props) => {
  const url = `http://openweathermap.org/img/wn/${props.icon}@4x.png`

  return (
    <img
      src={url}
      alt=""
      className="d-block mx-auto"
      style={{ width: "150px" }}
    />
  )
}
