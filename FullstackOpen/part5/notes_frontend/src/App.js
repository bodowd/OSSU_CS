import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
// we don't define `noteService` explicity. we just name what is exported from notes service as noteService
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  // // the first parameter is a function, the hook itself
  // // the second parameter specifies how often the effect is run. If the second parameter is an empty array, the effect is only run along with the first render of the component
  useEffect(hook, [])

  // handle the first loading of the page. checks localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // callback function sets the component's notes state to a new array that contains all the items from the previous notes array
    // except for the old note which is replaced by the updated version of it _returned_ by the server
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // contain all the items from the original notes array except where id matches the note id. In that case return the response that occurs after adding the new note to the server
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log(error.message)
        setErrorMessage(
          `Note '${note.content}' was already removed from the server!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleLogin = async (userObject) => {
    try {
      // returns token, username, and name from backend
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // save the token from authorization header so that notes can be added in the backend
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    // refresh the page
    window.location.reload(false)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      {/* child components are the react elements that we define between the opening and closing tags of a component */}
      <LoginForm
        doLogin={handleLogin}
      />
    </Togglable>
  )

  // the useRef hook is used to create a noteFormRef ref which acts as a reference to the component. This hook ensures
  // the same reference is kept throughout re-renders of the component
  const noteFormRef = useRef()
  const noteForm = () => (
    <Togglable className="makeNewNoteButton" buttonLabel="make new note" ref={noteFormRef}>
      <NoteForm
        createNote={addNote}
      />
    </Togglable>
  )


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* if the first statement evaluates to false, the second statement is not executed at all */}
      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}
      {/* the other way to make it more straightforward is this */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
          <button onClick={ () => handleLogout()}>logout</button>
        </div>
      }


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* notes is an array of objects */}
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>
    </div>
  )
}

export default App
