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


app.post('/api/persons', (request, response) => {
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