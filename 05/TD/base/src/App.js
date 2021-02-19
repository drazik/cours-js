import { fetchForecastForCity } from "./api.js"
import * as React from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Form } from "./Form.js"
import { Spinner } from "./Spinner.js"
import { Forecast } from "./Forecast.js"

export const App = () => {
  // 👉 Définir un state `status` avec la valeur initiale `"idle"`

  // 👉 Définir un state `error` avec la valeur initiale `null`

  // 👉 Définir un state `data` avec la valeur initiale `null`

  const handleSubmit = async (city) => {
    // 👉 Passer le state `status` à `"loading"`

    try {
      // 👉 Lancer l'appel à l'API (fonction `fetchForecastForCity`) et récupérer les données renvoyées

      // 👉 Mettre les données reçues dans le state `data`

      // 👉 Passer le state `status` à `"success"`
    } catch (error) {
      // 👉 Mettre le message d'erreur (propriété `message` de l'objet `error`) dans le state `error`

      // 👉 Passer le state `status` à `"error"`
    }
  }

  return (
    <div className="d-grid gap-4">
      <Form onSubmit={handleSubmit} />
      {/* 👉 Lorsque le status vaut "loading", afficher le message "Chargement..." */}

      {/* 👉 Lorsque le status vaut "error", afficher le message d'erreur */}

      {/* 👉 Lorsque le status vaut "success", afficher un composant Forecast en lui passant en props la ville et le tableau de prévisions reçus du serveur */}

    </div>
  )
}

export default App
