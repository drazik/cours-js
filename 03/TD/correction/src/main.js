import "bootstrap/dist/css/bootstrap.min.css"

// 👉 Importer les fonctions `initForm`, `initAvatar` et `initDescription`
import { initForm } from "./form"
import { initAvatar } from "./avatar"
import { initDescription } from "./description"

// 👉 Récupérer l'élément portant la classe `js-form`
const form = document.querySelector(".js-form")
// 👉 Passer l'élément à la fonction `initForm`
initForm(form)

// 👉 Récupérer l'élément portant la classe `js-avatar`
const avatar = document.querySelector(".js-avatar")
// 👉 Passer l'élément à la fonction `initAvatar`
initAvatar(avatar)

// 👉 Récupérer l'élément portant la classe `js-description`
const description = document.querySelector(".js-description")
// 👉 Passer l'élément à la fonction `initDescription`
initDescription(description)
