const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('correct number of initial blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

describe('addition of a blog', () => {
    let headers
    beforeEach(async () => {
        const newUser = {
            name: 'Jimmy Neutron',
            username: 'jneutron',
            password: 'salainen'
        }
        
        // register the user
        await api
            .post('/api/users/')
            .send(newUser)

        // login the user
        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {'Authorization': `bearer ${result.body.token}`}

    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            "title": "test2",
            "author": "na",
            "url": "google.com",
            "likes": 0
            }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('test2')
    })

    test('a blog without likes is added and should be given likes of 0', async () => {
        const newBlog = {
            'title': 'test3',
            'author': 'Roger',
            'url': 'google.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        
        const likes = blogsAtEnd.map(b => b.likes)
        expect(likes).toContain(0)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('test3')
    })

    test('a blog submission without title and url should return 400', async () => {
        const newBlog = {
            'author': 'this should fail'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog', () => {
    test('succeeds with statuscode 200 if blog is updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            ...blogToUpdate,
            'likes': 10
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

        const edited = blogsAtEnd.find(b => b.id === blogToUpdate.id)
        expect(edited.likes).toBe(10)

    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation of new user succeeds with fresh username', async () => {
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

    test('creation of new user does not succeed when password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mmmmmm",
            name: 'Matt',
            password: 'k'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('login', () => {
    let user
    beforeEach(async () => {
        const newUser = {
            username: 'mluukkai',
            password: 'salainen'
        }

        await api
            .post('/api/users/')
            .send(newUser)
        user = newUser
    })
    test('succeeds', async () => {

       await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
})

afterAll(() => {
    mongoose.connection.close()
})