import React from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import Note from './src/components/Notes'
import NewNote from './src/components/NewNote'
import VisibilityFilter from './src/components/VisibilityFilter'


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

  // we will store the value of the filter in the redux store in addition to the notes themselves
  const filterSelected = (value) => {
    console.log(value)
  }


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
