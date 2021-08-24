require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')





app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Middleware is a function that receives three parameters
// the next function yields control to the next middleware
const requestLogger = (request, repsponse, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

// const url = `mongodb+srv://fullstack:${process.env.NOTES_DB_PASS}@cluster0.uuykr.mongodb.net/note-app?retryWrites=true&w=majority`

// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// })

// const noteSchema = new mongoose.Schema({
//     content: String,
//     date: Date,
//     important: Boolean
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         // the _id property looks like a string, but is in fact an object. Transform it to a string to be safe once we start writing tests
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [{
//         id: 1,
//         content: "HTML is easy",
//         date: "2019-05-30T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only Javascript",
//         date: "2019-05-30T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2019-05-30T19:20:14.298Z",
//         important: true
//     },
//     {
//         id:4,
//         content: "New note",
//         date: "2021-05-01",
//         important: true
//     },
//     {
//         id:5,
//         content: "Another one",
//         date: "2021-02-20",
//         important: false
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

const generateId = () => {
    // find the largest id number and assign it the maxId variable
    const maxId = notes.length > 0
        // map returns an array that can't be given as a parameter to Math.max
        // convert the array into individual numbers using the three dot spread syntax "..."
        // Math.max takes arguments like this: Math.max(1,2,3,4,5) not an array
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if (!body.content) {
        // if received data is missing a value for the content property, respond with 400
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        // id: generateId()
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

// define paramters for routes in ExpressJS by using the colon syntax
app.get('/api/notes/:id', (request, response) => {
    // the id parameter in the route of a request can be accessed through the request object
    // id variable is a string whereas the id of notes are integers. need to change to int to do comparison
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    // if deleting the resource is successful, meaning that the note exists and it is removed, respond with 204 no content status code
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
// need to write it with localhost specified to make VSCode Rest Client extension work
// app.listen(PORT, 'localhost')
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})