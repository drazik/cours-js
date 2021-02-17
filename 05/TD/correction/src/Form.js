import * as React from "react"

export const Form = (props) => {
  const [city, setCity] = React.useState("")

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onSubmit(city.trim())
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
