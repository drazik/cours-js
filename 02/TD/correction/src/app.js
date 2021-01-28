// 👉 importer les fonctions initForm et initList à partir des fichiers form.js
// et list.js
import { initForm } from "./form"
import { initList } from "./list"

/**
 * Initialise l'app
 *
 * @param {HTMLFormElement} formElement - Le formulaire d'ajout d'un item
 * @param {HTMLUListElement} listElement - La liste contenant les items
 */
export const initApp = (formElement, listElement) => {
  // 👉 initialiser la liste en appelant la fonction initList en lui
  // passant l'élément de liste
  const list = initList(listElement)

  // 👉 initialiser le formulaire en appelant la fonction initForm en lui
  // passant l'élément de formulaire et la méthode `addItem` de la liste
  initForm(formElement, list.addItem)
}
