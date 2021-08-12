import React from 'react'
import persons from '../services/persons'


const Persons = ({persons, search, deleteEntry}) => {
  return (
    <div>
      {persons
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .map(p =>
          <div key={p.id}>
            {p.name} {p.number} <button onClick={() => deleteEntry(p.id)}>delete</button>
          </div>)}
    </div>
  )
}

export default Persons
