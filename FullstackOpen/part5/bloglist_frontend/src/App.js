import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
    setNotification({ message, type })
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

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const handleLike = async (id, dislike) => {
    if (!dislike) {
      var to_add = 1
    } else {
      to_add = -1
    }
    // update the backend first
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + to_add, user: blogToLike.user.id }
    await blogService.update(blogToLike.id, likedBlog)
    // update the front end with the new number of likes
    setBlogs(blogs.map(b => b.id === id ? { ...blogToLike, likes: blogToLike.likes + to_add } : b ))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`${returnedBlog.title} by ${returnedBlog.author} added!`)
      })
      .catch(error => {
        console.log(error.message)
        notifyWith('error adding blog', 'error')
      })

  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
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
          {blogForm()}
          {/* first sort blogs list (consisting of blog objects) by their list attribute then create populate the blog components */}
          {blogs.sort(function(a,b){return b.likes-a.likes})
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.username === blog.user.username} />)}
        </div>
      }
    </div>
  )
}

export default App
