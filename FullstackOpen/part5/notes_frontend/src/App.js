import React, { useState, useEffect } from "react";
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
// we don't define `noteService` explicity. we just name what is exported from notes service as noteService
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    // prevents the default action of submitting a form which would case a page reload among other things
    event.preventDefault()
    // console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    // // does not mutate the original notes array but rather creates a copy of the array with the new item added to the end
    // setNotes(notes.concat(noteObject))
    // // reset the value of newNote state
    // setNewNote('')
    // console.log(notes)

    // add note to db and to the application state to update the note list
    noteService
      .create(noteObject)
      .then(returnedNote => {
        // after the server responds that it has added the new note, update the note state to display it with the response data
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  // const handleNoteChange = (event) => {
  //   // do not need to call event.preventDefault() like we did above because there is no default action that occurs on an input change, unlike on a form submission
  //   console.log(event.target.value)
  //   setNewNote(event.target.value)
  // }

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // returns token, username, and name from backend
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // save the token from authorization header so that notes can be added in the backend
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
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

  const noteForm = () => (
    <NoteForm 
      handleSubmit={addNote}
      newNote={newNote}
      handleNoteChange={({ target }) => setNewNote(target.value)}
    />
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
  );
};

export default App;
