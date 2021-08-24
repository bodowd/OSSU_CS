const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(result => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// `Persons` has to match the db collection (or table) so it needs to be persons. Seems lower case is fine too
// if you call it something like foo, it won't find the collection and nothing will be returned
module.exports = mongoose.model('Persons', personSchema)
