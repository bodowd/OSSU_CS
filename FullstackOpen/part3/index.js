const express = require('express')
const app = express()

let notes = [{
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// define paramters for routes in ExpressJS by using the colon syntax
app.get('/api/notes/:id', (request, response) => {
    // the id parameter in the route of a request can be accessed through the request object
    // id variable is a string whereas the id of notes are integers. need to change to int to do comparison
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    // if the note doesn't exist (returning undefined) give a 404
    if (note) {
        response.json(note)
    } else {
        response.status(404).send()
    }
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    // if deleting the resource is successful, meaning that the note exists and it is removed, respond with 204 no content status code
    response.status(204).end()
})

const PORT = 3001
// need to write it with localhost specified to make VSCode Rest Client extension work
app.listen(PORT, 'localhost')