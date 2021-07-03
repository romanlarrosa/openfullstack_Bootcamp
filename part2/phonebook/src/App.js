import React, { useState, useEffect } from "react"
import PersonService from "./services/Persons"

import InfoMessage from "./components/InfoMessage"
import ErrorMessage from "./components/ErrorMessage"

const Filter = ({ setSearchValue, searchValue }) => {
  const filterOnChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
  }

  return (
    <div>
      Filter shown with
      <input
        autoComplete="new-password"
        type="text"
        onChange={filterOnChange}
        value={searchValue}
      />
    </div>
  )
}

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setInfoMessage,
  setErrorMessage,
}) => {
  const nameOnChange = (event) => {
    const value = event.target.value

    setNewName(value)
  }

  const numberOnChange = (event) => {
    const value = event.target.value
    setNewNumber(value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const index = persons.find((person) => person.name === newName)

    if (index) {
      if (
        window.confirm(
          `${newName} is already added, replace the old number with a new one?`
        )
      ) {
        const newObject = {
          name: newName,
          number: newNumber,
        }
        PersonService.update(index.id, newObject)
          .then((response) => {
            setInfoMessage(`Updated ${newObject.name}`)
            const array = persons.map((person) => {
              if (person.name === newObject.name) {
                return { ...newObject, id: response.data.id }
              } else return person
            })
            setPersons(array)
            setNewName("")
            setNewNumber("")
            setTimeout(() => setInfoMessage(""), 2000)
          })
          .catch((err) => {
            console.log(err.response)
            if (err.response.status === 404) {
              setErrorMessage(`${newObject.name} has alredy been removed`)
              setTimeout(() => setErrorMessage(""), 2000)
            }
          })
      }
    } else {
      const newPersonToAdd = {
        name: newName,
        number: newNumber,
      }
      PersonService.create(newPersonToAdd)
        .then((response) => {
          newPersonToAdd.id = response.data.id
          setInfoMessage(`Added ${newPersonToAdd.name}`)
          setTimeout(() => setInfoMessage(""), 2000)
        })
        .catch((err) => {
          setErrorMessage(err)
          setTimeout(() => setErrorMessage(""), 2000)
        })
      setPersons([...persons, newPersonToAdd])

      setNewName("")
      setNewNumber("")
    }
  }
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

const Numbers = ({ persons, searchValue, setPersons }) => {
  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.del(person.id)
      const index = persons.indexOf(person)
      if (index > -1) {
        const array = [...persons]
        array.splice(index, 1)
        setPersons(array)
      }
    }
  }

  return (
    <div>
      {persons
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}{" "}
                <button onClick={handleDelete(person)}>delete</button>
              </p>
            ))
        : "Loading..."}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    PersonService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {infoMessage ? <InfoMessage string={infoMessage} /> : ""}
      {errorMessage ? <ErrorMessage string={errorMessage} /> : ""}
      <Filter setSearchValue={setSearchValue} searchValue={searchValue} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage}
      />
      <h3>Numbers</h3>
      <Numbers
        persons={persons}
        searchValue={searchValue}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
