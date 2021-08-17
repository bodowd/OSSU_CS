const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('<h1>Hi</h1>')
})

const PORT = 3001
app.listen(PORT, 'localhost')