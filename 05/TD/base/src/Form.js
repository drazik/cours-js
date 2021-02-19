import * as React from "react"

export const Form = (props) => {
  // 👉 Définir un state `city` destiné à contenir la ville saisie par l'utilisateur (valeur initiale : chaîne vide)

  const handleChange = (e) => {
    // 👉 Mettre à jour le state city avec la valeur de l'input (`e.target`)
  }

  const handleSubmit = (e) => {
    // 👉 Empêcher le comportement par défaut du navigateur

    // 👉 Passer la ville saisie (sans espaces en début/fin) à la fonction `onSubmit` reçues dans les props

  }

  return (
    <form className="bg-light p-4 d-grid gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="city" className="form-label">
          Ville
        </label>
        <input
          className="form-control"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={city.trim().length === 0}
      >
        Envoyer
      </button>
    </form>
  )
}
