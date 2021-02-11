/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} description
 */

/**
 * Envoie une requête au serveur pour enregistrer un nouvel utilisateur
 *
 * @param {FormData} userData
 * @return {Promise<User>}
 */
export const registerUser = async (userData) => {
  const body = formDataToObject(userData)

  // Faire une requête asynchrone sur l'URL http://localhost:1234/register avec la méthode POST.
  // Le corps de la requête doit être formaté en JSON
  const response = await fetch("http://localhost:1234/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  // Si la réponse est OK, renvoyer les données du corps de la réponse
  if (response.ok) {
    return data
  }

  // Si le status de la réponse est 400, jeter une erreur correspondant au données du corps de la réponse
  if (response.status === 400) {
    throw data
  }

  // Jeter unen erreur avec le message "Erreur inconnue"
  throw new Error("Erreur inconnue")
}

const formDataToObject = (formData) => {
  return Object.fromEntries(formData.entries())
}
