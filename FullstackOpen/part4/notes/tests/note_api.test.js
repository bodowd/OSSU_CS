const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
})

describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

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

})

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
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

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    let headers
    beforeEach(async () => {
        const newUser = {
            username: 'mluukkai',
            password: 'salainen'
        }
        
        // register the user
        await api
            .post('/api/users/')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        // store the token which is returned and stored in result from the login procedure
        headers = {
            'Authorization': `bearer ${result.body.token}`
        }
    })
    
    test('succeeds with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .set(headers)
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
    
    test('fails with status code 400 if data is invalid', async () => {
        const newNote = {
            important: true
        }

        await api
            .post('/api/notes')
            .set(headers)
            .send(newNote)
            .expect(400)

        // check the state of the db 
        const notesAtEnd = await helper.notesInDb()
        // make sure the invalid note is not added and the db === original length
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
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


})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        
    })
})




afterAll(()=> {
    mongoose.connection.close()
})