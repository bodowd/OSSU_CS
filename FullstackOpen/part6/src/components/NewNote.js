import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    // we will name the input field in the html with note. That is how we can get event.target.note here
    const content = event.target.note.value
    event.target.note.value = ''
    // send data to backend
    const newNote = await noteService.createNew(content)
    // update the state
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
