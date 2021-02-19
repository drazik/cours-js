export const Spinner = (props) => {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">{props.label}</span>
    </div>
  )
}
