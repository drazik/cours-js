import { fetchForecastForCity } from "./api.js"
import * as React from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Form } from "./Form.js"
import { Spinner } from "./Spinner.js"
import { Forecast } from "./Forecast.js"

export const App = () => {
  // 👉 Définir un state `status` avec la valeur initiale `"idle"`
  const [status, setStatus] = React.useState("idle")

  // 👉 Définir un state `error` avec la valeur initiale `null`
  const [error, setError] = React.useState(null)

  // 👉 Définir un state `data` avec la valeur initiale `null`
  const [data, setData] = React.useState(null)

  const handleSubmit = async (city) => {
    // 👉 Passer le state `status` à `"loading"`
    setStatus("loading")

    try {
      // 👉 Lancer l'appel à l'API (fonction `fetchForecastForCity`) et récupérer les données renvoyées
      const data = await fetchForecastForCity(city)

      // 👉 Mettre les données reçues dans le state `data`
      setData(data)

      // 👉 Passer le state `status` à `"success"`
      setStatus("success")
    } catch (error) {
      // 👉 Mettre le message d'erreur (propriété `message` de l'objet `error`) dans le state `error`
      setError(error.message)

      // 👉 Passer le state `status` à `"error"`
      setStatus("error")
    }
  }

  return (
    <div className="d-grid gap-4">
      <Form onSubmit={handleSubmit} />
      {/* 👉 Lorsque le status vaut "loading", afficher le message "Chargement..." */}
      {status === "loading" ? (
        <div className="d-flex justify-content-center">
          <Spinner label="Chargement..." />
        </div>
      ) : null}
      {/* 👉 Lorsque le status vaut "error", afficher le message d'erreur */}
      {status === "error" ? (
        <p className="text-center text-danger">{error}</p>
      ) : null}
      {/* 👉 Lorsque le status vaut "success", afficher un composant Forecast en lui passant en props la ville et le tableau de prévisions reçus du serveur */}
      {status === "success" ? (
        <Forecast city={data.city} forecasts={data.forecasts} />
      ) : null}
    </div>
  )
}

export default App
