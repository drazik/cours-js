/**
 * Initialise une ligne de formulaire sur laquelle on veut afficher le nombre
 * de caractères restants à l'utilisateur
 *
 * @param {HTMLElement} root - l'élément racine du composant
 */
export const initDescription = (root) => {
  const WARNING_LENGTH = 30
  const DANGER_LENGTH = 10

  // 👉 Récupérer l'élément portant la classe `js-description-label` dans root
  const label = root.querySelector(".js-description-label")
  // 👉 Récupérer l'élément portant la classe `js-description-input` dans root
  const input = root.querySelector(".js-description-input")

  let hint

  const init = () => {
    initHint()

    // 👉 Attacher la fonction `updateHint` à l'événement "input" sur l'input
    input.addEventListener("input", updateHint)
  }

  const destroy = () => {
    // 👉 Détacher la fonction `updateHint` de l'événement "input" sur l'input
    input.removeEventListener("input", updateHint)
  }

  /**
   * Initialise l'élément contenant le nombre de caractères restants
   */
  const initHint = () => {
    hint = createHintElement()
    updateHint()

    label.append(hint)
  }

  /**
   * Crée l'élément destiné à contenir le nombre de caractères restants
   *
   * @return {HTMLSpanElement}
   */
  const createHintElement = () => {
    const element = document.createElement("span")

    element.style.fontSize = "0.85rem"
    element.classList.add("ms-1")

    return element
  }

  /**
   * Met à jour le contenu et le style de l'élément contenant le nombre de caractères
   * restants
   */
  const updateHint = () => {
    // 👉 Calculer le nombre de caractères restants à l'utilisateur
    // Sachant que le nombre de caractères max correspond à l'attribut "maxlength" de l'input
    const remaining = input.maxLength - input.value.length

    // 👉 Insérer la chaîne "(<nb caractères restants> caractères restants)" dans l'élément hint
    hint.textContent = `(${remaining} caractères restants)`

    // 👉 Si le nombre de caractères restants est compris entre DANGER_LENGTH et
    // WARNING_LENGTH, ajouter la classe `text-warning` sur l'élément hint, la retirer
    // sinon
    hint.classList.toggle(
      "text-warning",
      remaining > DANGER_LENGTH && remaining <= WARNING_LENGTH
    )

    // 👉 Si le nombre de caractères restants est inférieur ou égal à DANGER_LENGTH,
    // ajouter la classe `text-danger` sur l'élément hint, la retirer sinon
    hint.classList.toggle("text-danger", remaining <= DANGER_LENGTH)
  }

  init()

  return { destroy }
}
