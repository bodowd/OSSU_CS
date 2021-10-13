import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    doLogin({ username, password })

    setUsername('')
    setPassword('')

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            password
          <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  doLogin: PropTypes.func.isRequired
}

export default LoginForm