const config = require('./utils/config')
const express = require('express')
// allows us to eliminate the try catch block, automatically passes exceptions to the error handling middleware
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const bloglistRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', bloglistRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app