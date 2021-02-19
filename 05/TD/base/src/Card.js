export const Card = (props) => {
  return <div className="card">{props.children}</div>
}

export const CardBody = (props) => {
  return <div className="card-body">{props.children}</div>
}

export const CardTitle = (props) => {
  const Component = props.component

  return <Component className="card-title">{props.children}</Component>
}

CardTitle.defaultProps = {
  component: "div",
}
