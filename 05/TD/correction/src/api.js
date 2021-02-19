/**
 * Envoie une requête asynchrone sur l'API Open Weather MAP
 * Voir la documentation de l'API : https://openweathermap.org/forecast5
 *
 * @param {string} city
 * @returns {Promise<APIResult>}
 */
export const fetchForecastForCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  // 👉 Envoyer une requête asynchrone sur l'url définie dans la variable `url`,
  // et récupérer les données renvoyées (la réponse est au format JSON)
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  )

  const data = await response.json()

  // 👉 Si la propriété `cod` des données renvoyées vaut "200", renvoyer un objet du type
  // { city, forecasts } où city est la propriété `city` des données reçues, et
  // `forecasts` est la propriété `list` des données reçues
  if (data.cod === "200") {
    return { city: data.city, forecasts: data.list }
  }

  // 👉 Si la propriété `cod` des données renvoyées vaut "404", jeter une erreur avec le message "La ville demandée est introuvable"
  if (data.cod === "404") {
    throw new Error("La ville demandée est introuvable")
  }

  // 👉 Si la propriété `cod` des données renvoyées vaut "401", jeter une erreur avec le message "Clef API invalide"
  if (data.cod === "401") {
    throw new Error("Clef API invalide")
  }

  // 👉 Dans tous les autres cas, jeter une erreur avec le message "Erreur inconnue"
  throw new Error("Erreur inconnue")
}

/**
 * @typedef {Object} APIResult
 * @property {City} city
 * @property {Forecast[]} forecasts
 */

/**
 * @typedef {Object} City
 * @property {string} name
 */

/**
 * @typedef {Object} Forecast
 * @property {string} dt_txt
 * @property {ForecastMain} main
 * @property {ForecastWeather[]} weather
 * @property {ForecastWind} wind
 */

/**
 * @typedef {Object} ForecastMain
 * @property {number} feels_like
 * @property {number} temp
 */

/**
 * @typedef {Object} ForecastWeather
 * @property {string} icon
 */

/**
 * @typedef {Object} ForecastWind
 * @property {number} speed
 */
