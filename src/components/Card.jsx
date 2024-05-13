/* eslint-disable react/prop-types */

export const Card = (props) => {
  return(
      <div class="card">
          <h1>{props.name}</h1>
          <h3>{props.desc}</h3>
          <p>{props.categ}</p>
          <p>{props.value}</p>
          <img src={props.image} alt={props.name} width={150} height={"auto"}/>
          <h2>{props.status}</h2>
      </div>
  )
}