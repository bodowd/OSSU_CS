const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')){
        request.token =  auth.substring(7)
    }
    next()
}


const errorHandler = (error, request, response) => {
    if (error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor
}