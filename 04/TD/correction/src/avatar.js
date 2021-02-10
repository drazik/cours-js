/**
 * Initialise le composant d'avatar.
 * Ce composant permet la prévisualisation d'une image sélectionnée par l'utilisateur
 * dans un input de type file, ainsi que la réinitialisation de ce champ
 *
 * @param {HTMLElement} root - l'élément racine du composant
 */
export const initAvatar = (root) => {
  // 👉 Récupérer l'élément portant la classe `js-avatar-preview` dans root
  const preview = root.querySelector(".js-avatar-preview")
  // 👉 Récupérer l'élément portant la classe `js-avatar-delete` dans root
  const deleteButton = root.querySelector(".js-avatar-delete")
  // 👉 Récupérer l'élément portant la classe `js-avatar-input` dans root
  let input = root.querySelector(".js-avatar-input")

  const init = () => {
    // 👉 Attacher la fonction `handleChange` à l'événement "change" sur l'input
    input.addEventListener("change", handleChange)
    // 👉 Attacher la fonction `handleDelete` à l'événement "click" sur le bouton de suppression
    deleteButton.addEventListener("click", handleDelete)

    updateDeleteButton()
    updatePreview()
  }

  const destroy = () => {
    // 👉 Détacher la fonction `handleChange` de l'événement "change" sur l'input
    input.removeEventListener("change", handleChange)
    // 👉 Détacher la fonction `handleDelete` de l'événement "click" sur le bouton de suppression
    deleteButton.removeEventListener("click", handleDelete)
  }

  const handleChange = () => {
    // 👉 Mettre à jour le bouton de suppression
    updateDeleteButton()

    // 👉 Mettre à jour la preview
    updatePreview()
  }

  const handleDelete = () => {
    resetInput()

    // 👉 Mettre à jour la preview
    updatePreview()
    updateDeleteButton()
  }

  /**
   * Met à jour le bouton de suppression :
   *  - l'affiche si un fichier est sélectionné
   *  - le cache dans le cas contraire
   */
  const updateDeleteButton = () => {
    // 👉 Si un fichier a été sélectionné dans l'input, supprimer la classe `d-none`
    // sur le bouton de suppression; sinon l'ajouter
    if (input.files.length > 0) {
      deleteButton.classList.remove("d-none")
    } else {
      deleteButton.classList.add("d-none")
    }
  }

  /**
   * Met à jour la preview :
   *  - si un fichier est sélectionné, affiche l'image correspondante
   *  - sinon, affiche l'image de placeholder
   */
  const updatePreview = () => {
    // 👉 Si un fichier a été sélectionné dans l'input, appeler la fonction
    // `updatePreviewFromFile` en lui passant le fichier
    // Sinon, appeler la fonction `resetPreview`
    if (input.files.length > 0) {
      updatePreviewFromFile(input.files[0])
    } else {
      resetPreview()
    }
  }

  /**
   * Lit un fichier au format data url et met le résultat dans l'attribut src
   * de l'élément de preview
   *
   * @param {File} file
   */
  const updatePreviewFromFile = (file) => {
    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      preview.src = e.target.result
    })

    reader.readAsDataURL(file)
  }

  /**
   * Réinitialise la preview en affichant l'image de placeholder
   */
  const resetPreview = () => {
    // 👉 Mettre l'attribut `data-placeholder-src` de la preview dans son attribut `src`
    preview.src = preview.dataset.placeholderSrc
  }

  /**
   * Réinitialise le champ d'upload de fichier.
   * La seule façon propre de réinitialise un <input type="file" /> est d'appeler la
   * méthode `reset` du formulaire dans lequel il se trouve. Mais nous ne voulons pas
   * réinitialiser l'ensemble du formulaire. On clone donc l'input existant dans un
   * formulaire temporaire; on reset ce formulaire; puis on remplace l'input de la page
   * par l'input réinitialisé
   */
  const resetInput = () => {
    const newInput = input.cloneNode()
    const tmpForm = document.createElement("form")

    tmpForm.append(newInput)
    tmpForm.reset()

    input.replaceWith(newInput)
    input = newInput
  }

  init()

  return { destroy }
}
