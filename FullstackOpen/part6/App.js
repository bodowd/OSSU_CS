import React, { useEffect } from 'react'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import noteService from './services/notes'
import Note from './src/components/Notes'
import NewNote from './src/components/NewNote'
import VisibilityFilter from './src/components/VisibilityFilter'

const App = () => {

  // useEffect hook to get the data from server
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(initializeNotes(notes)))
  }, [dispatch])
  // if vbalue of the dispatch variable changes during runtime, the effect will be executed again

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Note />
    </div>
  )
}

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// renderApp()
// store.subscribe(renderApp)

export default App
