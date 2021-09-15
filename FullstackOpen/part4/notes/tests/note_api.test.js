const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')

beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes.map(note => new Note(note))
    // this array consists of promises created by calling the save method of each item in the noteObjects array
    const promiseArray = noteObjects.map(note => note.save())
    // wait for all of the asynchronous operations to finish executing with the Promise.all method
    // Promise.all transforms an array of promises into a single promise that will be fulfilled once every promise in the array passed to it as a parameter is resolved
    await Promise.all(promiseArray)

})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('HTML is easy')

})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only Javascript'
    )
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // check that the note is added to the db, so it should have a length + 1
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    // check that the added note contains the following content
    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    // check the state of the db 
    const notesAtEnd = await helper.notesInDb()
    // make sure the invalid note is not added and the db === original length
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // date property gets converted from a Date object into a string, so we can't directly compare
    // resultNote.body to noteToView. Instead we must perform JSON serialization and parsing for the noteToView
    // as the server is performing for the note object
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
    
    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
})


afterAll(()=> {
    mongoose.connection.close()
})