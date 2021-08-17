const { response } = require('express')
const express = require('express')
const app = express()

// THIS IS SUPER IMPORTANT. initial handler for dealing with HTTP POST requests
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hi</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number
  }
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  persons = persons.concat(person)
  response.json(person)
})

app.get('/info', (request, response) => {
  response.send(
    `<div>
      Phonebook has info for ${persons.length} people
    </div>
    <div>
      ${new Date()}
    </div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).send()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  // filter out the id that matches the request (keep the ones that don't match)
  persons = persons.filter(p => p.id !== id)
  // if deleting the resource is successful, respond with no content 204
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, 'localhost')