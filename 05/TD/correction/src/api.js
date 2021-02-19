/**
 * @param {string} city
 * @returns {Promise<APIResult>}
 */
export const fetchForecastForCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  )

  const data = await response.json()

  if (data.cod === "200") {
    return { city: data.city, forecasts: data.list }
  }

  if (data.cod === "404") {
    throw new Error("La ville demandée est introuvable")
  }

  if (data.cod === "401") {
    throw new Error("Clef API invalide")
  }

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
