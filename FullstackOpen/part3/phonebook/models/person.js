const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

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
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

// `Persons` has to match the db collection (or table) so it needs to be persons. Seems lower case is fine too
// if you call it something like foo, it won't find the collection and nothing will be returned
module.exports = mongoose.model('Persons', personSchema)
