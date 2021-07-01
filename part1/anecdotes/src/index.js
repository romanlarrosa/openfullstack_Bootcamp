import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(10))

  const handlerClick = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const handlerVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const indexOfMaxValue = votes.indexOf(Math.max(...votes))

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <button onClick={handlerVote}>vote</button>
      <button onClick={handlerClick}>next anecdote</button>

      {votes[indexOfMaxValue] === 0 ? (
        console.log("No hay votos")
      ) : (
        <>
          <h2>Most voted</h2>
          <div>{props.anecdotes[indexOfMaxValue]}</div>
        </>
      )}
    </>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
