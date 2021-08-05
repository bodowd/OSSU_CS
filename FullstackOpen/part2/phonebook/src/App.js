import React, { useState } from "react";

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newSearch, setNewSearch] = useState("")
  const [toShow, setToShow] = useState([])


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

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const personToShow = newSearch === "" ? persons : persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newSearch} onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
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
          {personToShow.map(person => <Person key={person.name} person={person}/> )}
        </div>
    </div>
  );
};

export default App;
