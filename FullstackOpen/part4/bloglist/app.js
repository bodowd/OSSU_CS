const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bloglistRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
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

module.exports = app