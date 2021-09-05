require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')

const app = require('./app') // the actual express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
}



// app.use(express.static('build'))
// app.use(cors())
// app.use(express.json())

// // Middleware is a function that receives three parameters
// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)

//     if (error.name === 'CastError') {
//         return response.status(400).send({ error: 'malformatted id' })
//     } else if (error.name === 'ValidationError') {
//         return response.status(400).json({ error: error.message })
//     }
//     next(error)
// }

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }

// // the next function yields control to the next middleware
// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:', request.path)
//     console.log('Body:', request.body)
//     console.log('---')
//     next()
// }

// app.use(requestLogger)

// // -------- ROUTES ----------
// app.get('/', (request, response) => {
//     response.send('<h1>Hello world</h1>')
// })

// app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//         response.json(notes)
//     })
// })

// const generateId = () => {
//     // find the largest id number and assign it the maxId variable
//     const maxId = notes.length > 0
//         // map returns an array that can't be given as a parameter to Math.max
//         // convert the array into individual numbers using the three dot spread syntax "..."
//         // Math.max takes arguments like this: Math.max(1,2,3,4,5) not an array
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }

// app.post('/api/notes', (request, response, next) => {
//     const body = request.body

//     if (!body.content) {
//         // if received data is missing a value for the content property, respond with 400
//         return response.status(400).json({
//             error: 'content missing'
//         })
//     }

//     const note = new Note({
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//         // id: generateId()
//     })

//     note.save()
//         .then(savedNote => {
//             response.json(savedNote)
//         })
//         .catch(error => next(error))
// })



// // define paramters for routes in ExpressJS by using the colon syntax
// app.get('/api/notes/:id', (request, response, next) => {
//     // the id parameter in the route of a request can be accessed through the request object
//     // id variable is a string whereas the id of notes are integers. need to change to int to do comparison
//     Note.findById(request.params.id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         // if malformed invalid mongodb id is given as argument, the returned promise will be rejected and cause the catch block to be called
//         // if next was called without a parameter, the execution would simply move onto the next route or middleware. If the next function is called with a parameter,
//         // then the execution will continue to the error handler middleware
//         .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//     Note.findByIdAndRemove(request.params.id)
//         // if deleting the resource is successful, meaning that the note exists and it is removed, respond with 204 no content status code
//         .then(result => {
//             response.status(204).end()
//         })
//         .catch(error => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
//     const body = request.body
//     const note = {
//         content: body.content,
//         important: body.important
//     }

//     // mongodb model function: {new: true} option returns the modified document rather than the original. defaults to false
//     Note.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })



// // THESE MIDDLEWARE NEED TO BE HERE TOWARD THE END IN THIS ORDER...
// // handler of requests with unkown endpoint. This responds to all requests with 404 unknown endpoint, and no routes or middleware will be called after this response has been sent by unknown endpoint middleware
// // if this was ordered before app.get('/api/notes'...) since this responds to all requests with a 404 unknown endpoint, no routes or middleware will be called 
// // after the response has been sent by unknown endpoint middleware. Everything would return with unknown endpoint, except for the error handler which comes after the endpoints handler
// app.use(unknownEndpoint)
// // this has to be the last loaded middleware 
// app.use(errorHandler)

// const PORT = process.env.PORT
// // need to write it with localhost specified to make VSCode Rest Client extension work
// // app.listen(PORT, 'localhost')
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })