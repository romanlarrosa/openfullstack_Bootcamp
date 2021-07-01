import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all !== 0 ? (good * 1 - bad * 1) / all : 0
  const positive = all !== 0 ? (good / all) * 100 : "?"

  return (
    <>
      <h2>statistics</h2>
      {all !== 0 ? (
        <>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={all}></Statistic>
          <Statistic text="average" value={average}></Statistic>
          <Statistic text="positive" value={positive + "%"}></Statistic>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
