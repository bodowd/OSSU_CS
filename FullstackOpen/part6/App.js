import React from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'


// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1,
//   },
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2,
//   },
// })



const App = () => {
  // useDispatch hook dispatches the actions to the store
  // provides any React component access to the dispatch function of the redux store defined in index.js
  // allows all components to make changes to the state of the redux store
  const dispatch = useDispatch()

  // access the data stored in the store with useSelector hook, which is an array
  // we need all of the notes so the selector function returns the whole state
  // could return selected parts of the contents of the redux store for example:
  // useSelector(state => state.filter(note => note.important))
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    // we will name the input field in the html with note. That is how we can get event.target.note here
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          // change the notes importance by clicking on its name
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// renderApp()
// store.subscribe(renderApp)

export default App
