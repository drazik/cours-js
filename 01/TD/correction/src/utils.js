/**
 * Génère un nombre entier aléatoire compris entre min et max
 *
 * @param {Number} min - La valeur minimale
 * @param {Number} max - La valeur maximale
 * @return {Number} Un nombre aléatoire compris entre min et max
 */
export const generateRandomNumber = (min, max) => {
  // 👉 Utilisez la fonction `Math.random` pour générer un nombre aléatoire
  return Math.floor(Math.random() * (max - min) + min)
}
