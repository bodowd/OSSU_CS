import React, { useState, useEffect } from "react";
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons"



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }

  useEffect(hook, [])


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
      personsService
        .create(nameObject)
        .then(returnedPeople => {
          setPersons(persons.concat(returnedPeople))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const personToShow = newSearch === "" ? persons : persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={newSearch} onSearch={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
