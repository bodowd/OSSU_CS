import axios from 'axios'
const baseUrl = '/api/blogs'

// private variable token to be changed with the setToken function
let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll, setToken }