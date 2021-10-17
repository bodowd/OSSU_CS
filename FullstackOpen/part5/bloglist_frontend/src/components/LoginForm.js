import React from 'react'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input id="loginUsername" type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
                    password
          <input id="loginPassword" type="text" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm