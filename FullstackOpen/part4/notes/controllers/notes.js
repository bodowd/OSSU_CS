// the route handlers have been moved into a dedicated module.
// the event handlers of routes are commonly referred to as controllers
// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.


const notesRouter = require('express').Router()
const Note = require('../models/note')

// -------------- GET routes -----------
notesRouter.get('/', async (requet, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

// the notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter /:id
notesRouter.get('/:id', async (request, response, next) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    
})

// --------------- POST routes ------------
notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    const savedNote = await note.save()
    response.json(savedNote)
})

// ------------ DELETE routes -----------
notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// ----------- PUT routes ------------
notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})


module.exports = notesRouter