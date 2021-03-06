const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    // mongoose join is done with the populate method
    // the parameter given to the populate method defines that the ids referencing the note objects in the notes field of the user document will be replaced by the referenced note documents
    // select fields we want to include from the documents -- content and date
    const users = await User.find({}).populate('notes', { content: 1, date: 1 })

    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = usersRouter