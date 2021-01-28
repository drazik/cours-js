/*
 * @typedef {Object} Item
 * @property {function} addItem - Permet d'ajouter un item à la liste
 */

/**
 * Initialise la liste
 *
 * @param {HTMLUListElement} listElement - La liste d'items
 *
 * @return {Item}
 */
export const initList = (listElement) => {
  /**
   * Crée un nouvel item et l'ajoute à la liste
   *
   * @param {string} label
   */
  const addItem = (label) => {
    // 👉 Utiliser la fonction `makeItem` pour créer un élément représentant
    // un item de la liste à partir du label

    // 👉 Ajouter l'item à la liste
  }

  return { addItem }
}

/**
 * Initialise un item de la liste
 *
 * @return {HTMLLIElement} L'élément du DOM de l'item
 */
const makeItem = (label) => {
  // 👉 Créer l'élément de l'item à l'aide de la fonction `createItemNode`
  // const element = ...

  // 👉 Récupérer l'input et le bouton dans l'élément créé
  // const input = ...
  // const button = ...

  const init = () => {
    input.addEventListener("change", handleSelect)
    button.addEventListener("click", destroy)
  }

  /**
   * Gère l'état visuel "sélectionné" ou non de l'item.
   */
  const handleSelect = (e) => {
    // 👉 Ajouter la classe list__item--selected à l'item si e.target.checked
    // vaut true. La retirer sinon
  }

  const destroy = () => {
    // 👉 Supprimer l'élément du DOM

    input.removeEventListener("change", handleSelect)
    button.addEventListener("click", destroy)
  }

  init()

  return element
}

/**
 * Crée un nouvel élément DOM pour un item de la liste
 *
 * @param {string} itemLabel - Le label de l'item
 *
 * @return {HTMLLiElement} L'élément créé
 */
const createItemElement = (itemLabel) => {
  // 👉 Créer un élément de type "li"

  // 👉 Affecter la classe "list__item" à l'élément

  // 👉 Créer un élément de type "label"

  // 👉 Créer un élément de type "input"

  // 👉 Affecter le type "checkbox" à l'input

  // 👉 Créer un élément de type "button"

  // 👉 Affecter le type "button" au button

  // 👉 Affecter la classe "list__remove-btn" au button

  // 👉 Ajouter la chaîne "❌" dans le button

  // 👉 Affecter la valeur 'Supprimer' à l'attribut aria-label du button

  // 👉 Ajouter l'input dans le label

  // 👉 Ajouter itemLabel dans le label

  // 👉 Ajouter le label dans l'item

  // 👉 Ajouter le button dans l'item
}
