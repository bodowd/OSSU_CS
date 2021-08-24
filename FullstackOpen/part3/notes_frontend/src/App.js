import React, { useState, useEffect } from "react";
import Note from './components/Note'
import Notification from './components/Notification'
// we don't define `noteService` explicity. we just name what is exported from notes service as noteService
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


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

  const handleNoteChange = (event) => {
    // do not need to call event.preventDefault() like we did above because there is no default action that occurs on an input change, unlike on a form submission
    console.log(event.target.value)
    setNewNote(event.target.value)
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
