import React, { useState } from "react";

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , number: "12345"}]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // check if name is already in the phonebook
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return (null)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      console.log(persons);
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person => <Person key={person.name} person={person}/> )}
        </div>
    </div>
  );
};

export default App;
