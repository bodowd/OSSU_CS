import React, {useState, useEffect} from "react";
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }


  const countriesToShow = newSearch === "" ? countries : countries.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <Filter search={newSearch} onSearch={handleSearchChange} />
      <Countries toShow={countriesToShow} />
    </div>
  );
}

export default App;
