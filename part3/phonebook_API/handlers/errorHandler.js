const errorHandler = (error, request, response, next) => {
  console.error("\x1b[35m%s\x1b[0m", error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler
