import React, { useState, useEffect } from "react"
import axios from "axios"

const Filter = ({ onChange, searchValue }) => {
  return (
    <div>
      Filter shown with
      <input
        autoComplete="new-password"
        type="text"
        onChange={onChange}
        value={searchValue}
      />
    </div>
  )
}

const PersonForm = ({
  handleSubmit,
  nameOnChange,
  numberOnChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          name:
          <input
            autoComplete="new-password"
            onChange={nameOnChange}
            type="text"
            value={newName}
          />
        </div>
        <div>
          number:
          <input
            autoComplete="new-password"
            onChange={numberOnChange}
            type="text"
            value={newNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = ({ persons, searchValue }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  }, [])

  const nameOnChange = (event) => {
    const value = event.target.value

    setNewName(value)
  }

  const numberOnChange = (event) => {
    const value = event.target.value
    setNewNumber(value)
  }

  const filterOnChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersonToAdd = {
        name: newName,
        number: newNumber,
      }
      console.log({ newPersonToAdd })
      setPersons([...persons, newPersonToAdd])

      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterOnChange} searchValue={searchValue} />

      <h3>add a new</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        nameOnChange={nameOnChange}
        numberOnChange={numberOnChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Numbers persons={persons} searchValue={searchValue} />
    </div>
  )
}

export default App
