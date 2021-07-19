const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const Person = require("./models/person")
const errorHandler = require("./handlers/errorHandler")
const unknownEndpointHandler = require("./handlers/unknownEndpointHandler")

const app = express()
app.use(express.json())
app.use(express.static("build"))
app.use(cors())

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Content missing",
    })
  }

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    let string = ""
    string += `<p>Phonebook has info for ${result.length} people</p>`
    string += `<p>${Date(Date.now()).toString()}</p>`

    response.send(string)
  })
})

//Middleware for unknown endpoints
app.use(unknownEndpointHandler)

//Middleware for errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
