const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const Person = require("./models/person")

const app = express()
app.use(express.json())
app.use(express.static("build"))
app.use(cors())

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
]

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      response.status(500).end()
    })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Content missing",
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

app.get("/info", (request, response) => {
  let string = ""
  string += `<p>Phonebook has info for ${persons.length} people</p>`
  string += `<p>${Date(Date.now()).toString()}</p>`

  response.send(string)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
