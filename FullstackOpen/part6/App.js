import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      // return state.concat(action.data)
      // or using the JS array spread syntax
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      // a new state is returned. Created by taking all of the notes from the old state, except for the desired note, which we replace
      // with its slightly altered copy
      return state.map((note) => (note.id !== id ? note : changedNote))
    }
    default:
      return state
  }
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
})

const generateId = () => Math.floor(Math.random() * 10000000)

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    // we will name the input field in the html with note. That is how we can get event.target.note here
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId(),
      },
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id },
    })
  }
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
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
