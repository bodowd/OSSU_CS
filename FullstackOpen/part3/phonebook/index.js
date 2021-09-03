require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
// THIS IS SUPER IMPORTANT. initial handler for dealing with HTTP POST requests
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) {return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }
  next(error)
}


app.get('/', (request, response) => {
  response.send('<h1>Hi</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  }).catch(error => {
    console.log('ERROR: ', error.message)
  })
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // if (Person.find({}).then(p => {
  //   response.json(p)
  // }).filter(p => p.name === body.name).length > 0){
  //   return response.status(400).json({
  //     error: 'name already in phonebook'
  //   })
  // }


  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    response.send(
      `<div>
      Phonebook has info for ${people.length} people
    </div>
    <div>
      ${new Date()}
    </div>`)

  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(`Deleted ${result.name}`)
      response.status(204).end()
    })
    .catch(error => console.log(error))
})

// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})