// Collez votre clef API ici
export const API_KEY = "VOTRE CLEF API"
export const BASE_URL = `https://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}&format=json`

/**
 * Renvoie l'URL complète vers un endpoint de l'API lastfm
 *
 * @param {Object} params
 * @param {string} params.method
 * @return {string}
 */
function makeEndpoint(params = {}) {
  return BASE_URL + "&" + Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join("&")
}

/**
 * Récupère les informations d'un artiste sur l'API lastfm
 *
 * @param {string} artistName
 * @return {Object}
 */
export async function getArtistInfo(artistName) {
  let url = makeEndpoint({
    method: "artist.getinfo",
    artist: artistName.toLowerCase()
  })

  // Faire un appel à la fonction fetch sur l'url générée précédemment
  // ...
  
  // Parser la réponse en JSON
  // let data = ...

  // Si data.error existe, alors lancer une erreur avec data.message
  // ...

  // Retourner data
  // ...
}