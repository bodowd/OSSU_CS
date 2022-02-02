import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' 
import { createStore, combineReducers } from 'redux'
import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store}>
    {/* app is now defined as a child of a provider component provided by the react redux library */}
    <App />
  </Provider>,
  document.getElementById('root')
)