import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  // useDispatch hook dispatches the actions to the store
  // provides any React component access to the dispatch function of the redux store defined in index.js
  // allows all components to make changes to the state of the redux store
  const dispatch = useDispatch()

  // access the data stored in the store with useSelector hook, which is an array
  // we need all of the notes so the selector function returns the whole state
  // could return selected parts of the contents of the redux store for example:
  // useSelector(state => state.filter(note => note.important))

  // could destructure this to {filter, notes} which are the two fields of state
  const notes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.notes
    } else if (state.filter === 'IMPORTANT') {
      return state.notes.filter((note) => note.important)
    }
    // otherwise it is NONIMPORTANT
    else {
      return state.notes.filter((note) => !note.important)
    }
  })
  // because we expect the array of notes which is in the store's field notes

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  )
}

export default Notes
