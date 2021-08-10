import React, {useState, useEffect} from "react";
import axios from 'axios'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data)
      })
  }
  // the first parameter is a function, the hook itself
  // the second parameter specifies how often the effect is run. If the second parameter is an empty array, the effect is only run along with the first render of the component
  useEffect(hook, [])

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    // prevents the default action of submitting a form which would case a page reload among other things
    event.preventDefault()
    // console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5
    }
    // // does not mutate the original notes array but rather creates a copy of the array with the new item added to the end
    // setNotes(notes.concat(noteObject))
    // // reset the value of newNote state
    // setNewNote('')
    // console.log(notes)
    axios
    // adds note to the db
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        // adds to the list of notes in the application's state
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    // do not need to call event.preventDefault() like we did above because there is no default action that occurs on an input change, unlike on a form submission
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* notes is an array of objects */}
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
