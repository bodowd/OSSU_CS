import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`welcome back ${user.name}!`)
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const loginForm = () => (
    <LoginForm 
      username={username}
      password={password}
      handleSubmit={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      />
  )

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        notifyWith(`${returnedBlog.title} by ${returnedBlog.author} added!`)
      })
      .catch(error => {
        console.log(error.message)
        notifyWith('error adding blog', 'error')
      })

  }


  const blogForm = () => (
    <BlogForm
      handleSubmit={addBlog}
      title={newBlogTitle}
      handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
      author={newBlogAuthor}
      handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
      url={newBlogUrl}
      handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
      />
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ?
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
     :
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogout()}>logout</button>
        <h2>create new</h2>
        {blogForm()}
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </div>
      }
    </div>
  )
}

export default App
