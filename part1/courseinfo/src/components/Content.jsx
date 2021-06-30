import React from "react"

/* 
Tambien se podría escribir así
const Part = ({description, num}) => <p>{description} {num}</p>
*/
const Part = (props) => {
  return (
    <p>
      {props.description} {props.num}
    </p>
  )
}

const Content = (props) => {
  console.log(props.content)
  return (
    <div>
      {props.content.map((element) => {
        return (
          <Part
            key={element.exercises}
            description={element.name}
            num={element.exercises}
          />
        )
      })}
    </div>
  )
}

export default Content
