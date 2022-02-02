const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state',
    important: false,
    id: 2,
  },
]

// reducer defines the impact of the action to the state of the app
// customary to use switch in the reducer
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

const generateId = () => Math.floor(Math.random() * 10000000)

// action creator. Creates actions
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

// action creator
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  }
}

export default noteReducer
