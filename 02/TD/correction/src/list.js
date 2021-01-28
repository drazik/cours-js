const makeItem = (label) => {
  const node = createItemNode(label)
  const input = node.querySelector("input")
  const button = node.querySelector("button")

  const init = () => {
    input.addEventListener("change", handleSelect)
    button.addEventListener("click", destroy)
  }

  const handleSelect = (e) => {
    const selectedClass = "list__item--selected"

    // 👉 Ajouter la classe list__item--selected à l'item si e.target.checked
    // vaut true. La retirer sinon
    if (e.target.checked) {
      node.classList.add(selectedClass)
    } else {
      node.classList.remove(selectedClass)
    }
  }

  const destroy = () => {
    node.remove()

    input.removeEventListener("change", handleSelect)
    button.addEventListener("click", destroy)
  }

  init()

  return node
}

/**
 * Crée un nouvel élément DOM pour un item de la liste
 *
 * @param {string} itemLabel - Le label de l'item
 *
 * @return {HTMLLiElement} L'élément créé
 */
const createItemNode = (itemLabel) => {
  // 👉 Créer un élément de type li
  const item = document.createElement("li")

  // 👉 Affecter la classe list__item à l'élément
  item.className = "list__item"

  // 👉 Créer un élément de type label
  const label = document.createElement("label")

  // 👉 Créer un élément de type input
  const input = document.createElement("input")

  // 👉 Affecter le type checkbox à l'input
  input.type = "checkbox"

  // 👉 Créer un élément de type button
  const button = document.createElement("button")

  // 👉 Affecter le type button au button
  button.type = "button"

  // 👉 Affecter la classe list__remote-btn au button
  button.className = "list__remove-btn"

  // 👉 Ajouter la chaîne '❌' dans le button
  button.append("❌")

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

/**
 * Initialise la liste
 *
 * @param {HTMLUListElement} listElement - La liste d'items
 *
 * @return {Object}
 */
export const initList = (listElement) => {
  /**
   * Crée un nouvel item et l'ajoute à la liste
   *
   * @param {string} label
   */
  const addItem = (label) => {
    // 👉 Utiliser la fonction `makeItem` pour créer un élément représentant un item de la liste
    const item = makeItem(label)

    // 👉 Ajouter l'item à la liste
    listElement.append(item)
  }

  return { addItem }
}
