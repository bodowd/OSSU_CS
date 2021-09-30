// the route handlers have been moved into a dedicated module.
// the event handlers of routes are commonly referred to as controllers
// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.


const notesRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const jwt = require('jsonwebtoken')


// -------------- GET routes -----------
notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(notes)
})

// the notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter /:id
notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    
})

// --------------- POST routes ------------
const getTokenFrom = request => {
    // isolates the token from the authorization header
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}
notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    // verify the token and decodes the token Object
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // token Object contains username and id fields
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id
    })

    const savedNote = await note.save()

    // user object also changes. the note id is concatenated
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
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