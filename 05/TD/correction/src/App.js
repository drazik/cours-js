import { fetchForecastForCity } from "./api.js"
import * as React from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Form } from "./Form.js"
import { Spinner } from "./Spinner.js"
import { Forecast } from "./Forecast.js"

function App() {
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  const handleSubmit = async (city) => {
    setStatus("loading")

    try {
      const data = await fetchForecastForCity(city)
      setData(data)
      setStatus("success")
    } catch (error) {
      setError(error.message)
      setStatus("error")
    }
  }

  return (
    <div className="d-grid gap-4">
      <Form onSubmit={handleSubmit} />
      {status === "loading" ? (
        <div className="d-flex justify-content-center">
          <Spinner label="Chargement..." />
        </div>
      ) : null}
      {status === "error" ? (
        <p className="text-center text-danger">{error}</p>
      ) : null}
      {status === "success" ? (
        <Forecast city={data.city} forecasts={data.forecasts} />
      ) : null}
    </div>
  )
}

export default App
