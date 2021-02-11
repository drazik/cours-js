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

  // 👉 Faire une requête asynchrone sur l'URL http://localhost:1234/register avec la méthode POST.
  // 👉 Le corps de la requête doit être formaté en JSON


  // 👉 Si la réponse est OK, renvoyer les données du corps de la réponse


  // 👉 Si le status de la réponse est 400, jeter une erreur correspondant au données du corps de la réponse


  // 👉 Jeter unen erreur avec le message "Erreur inconnue"

}

const formDataToObject = (formData) => {
  return Object.fromEntries(formData.entries())
}
