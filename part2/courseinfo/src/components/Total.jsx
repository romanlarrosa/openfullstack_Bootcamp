import React from "react"

const Total = (props) => {
  const exercises = props.content.map((content) => {
    return content.exercises
  })

  return (
    <p>
      <strong>Total of {exercises.reduce((a, b) => a + b)} exercises</strong>
    </p>
  )
}

export default Total
