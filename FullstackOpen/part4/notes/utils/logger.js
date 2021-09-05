// info for printing normal log messages
const info = (...params) => {
    console.log(...params)
}

// error for all error messages
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}