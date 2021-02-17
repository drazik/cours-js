import groupBy from "lodash/groupBy"
import { Card, CardBody, CardTitle } from "./Card.js"

export const Forecast = (props) => {
  const forecastsByDay = groupForecastsByDay(props.forecasts)

  return (
    <div className="px-4 d-grid gap-5">
      <h1 className="text-center">Météo à {props.city.name}</h1>
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
      <h2 className="fs-2">Le {date.toLocaleDateString("fr-FR")}</h2>
      <div className="d-flex gap-2" style={{ overflowX: "auto" }}>
        {props.forecasts.map((forecast) => (
          <div
            className="flex-grow-0 flex-shrink-0"
            style={{ flexBasis: 250 }}
            key={forecast.dt_txt}
          >
            <ForecastItem forecast={forecast} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ForecastItem = (props) => {
  const hour = getHourFromDateText(props.forecast.dt_txt)
  const weather = props.forecast.weather[0]

  return (
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
