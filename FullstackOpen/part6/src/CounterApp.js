import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    // if none of the above matches, code comes here
    default:
      return state
  }
}

// createStore creates the store and the reducer is passed as a parameter to that, not called directly from application's code
const store = createStore(counterReducer)

// create a callback function that the store calls when its state is changed
// this will print to console the state of the store each time the state is changed in the store
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

export default function App() {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

