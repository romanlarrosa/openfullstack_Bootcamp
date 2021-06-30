import React from "react"

const Total = (props) => {
  const exercises = props.content.map((content) => {
    return content.exercises
  })

  return (
    <div>
      <p>
        Number of exercises{" "}
        {exercises.reduce((a, b) => {
          return a + b
        })}
      </p>
    </div>
  )
}

export default Total
