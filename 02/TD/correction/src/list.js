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
    const item = makeItem(label)

    // 👉 Ajouter l'item à la liste
    listElement.append(item)
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
  const element = createItemElement(label)

  // 👉 Récupérer l'input et le bouton dans l'élément créé
  const input = element.querySelector("input")
  const button = element.querySelector("button")

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
    const selectedClass = "list__item--selected"

    if (e.target.checked) {
      element.classList.add(selectedClass)
    } else {
      element.classList.remove(selectedClass)
    }
  }

  const destroy = () => {
    // 👉 Supprimer l'élément du DOM
    element.remove()

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
  const item = document.createElement("li")

  // 👉 Affecter la classe "list__item" à l'élément
  item.classList.add("list__item")

  // 👉 Créer un élément de type "label"
  const label = document.createElement("label")

  // 👉 Créer un élément de type "input"
  const input = document.createElement("input")

  // 👉 Affecter le type "checkbox" à l'input
  input.type = "checkbox"

  // 👉 Créer un élément de type "button"
  const button = document.createElement("button")

  // 👉 Affecter le type "button" au button
  button.type = "button"

  // 👉 Affecter la classe "list__remove-btn" au button
  button.className = "list__remove-btn"

  // 👉 Ajouter la chaîne "❌" dans le button
  button.textContent = "❌"

  // 👉 Affecter la valeur 'Supprimer' à l'attribut aria-label du button
  button.setAttribute("aria-label", "Supprimer")

  // 👉 Ajouter l'input dans le label
  label.append(input)

  // 👉 Ajouter itemLabel dans le label
  label.append(itemLabel)

  // 👉 Ajouter le label dans l'item
  item.append(label)

  // 👉 Ajouter le button dans l'item
  item.append(button)

  return item
}
