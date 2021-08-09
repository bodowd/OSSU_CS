import React, { useState } from "react";
import axios from 'axios'
import Weather from './Weather'

const CountryWithInfo = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
      </div>
      <img
        src={country.flag}
        alt="flag of country"
        width="250"
        height="200"
      ></img>
      <h2>Weather in {country.capital}</h2>
      <Weather country={country} weather={weather}/>
    </div>
  );
};


const Countries = (props) => {
  const [show, setShow] = useState("");
  const [weather, setWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  const toggle = (country) => {
      // if the country name is already set to show, then when this button is hit again, it will setShow to '' in order to hide
      if (show === country.name) {
          setShow('')
      }
      else {
          setShow(country.name)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
      }
  }

  const ToggleButton = ({country}) => {
      return (
          <button onClick={() => toggle(country)}>
              {country.name === show ? 'hide' : 'show'}
          </button>
      )
  }

  const Country = ({ country, type }) => {
    if (type === "detailed") {
      return (
        <div>
          <CountryWithInfo country={country} weather={weather} />
          <ToggleButton country={country} />
        </div>)
    }
    return (
      <div>
        {country.name}
        <ToggleButton country={country} />
      </div>
    );
  };

  if (props.toShow.length === 1) {
    return (
      <div>
        {props.toShow.map((c) => (
          <Country key={c.name} type="detailed" country={c} weather={null} />
        ))}
      </div>
    );
  }
  if (props.toShow.length < 10) {
    return (
      <div>
        {props.toShow.map((c) => (
          <Country
            key={c.name}
            type={c.name === show ? "detailed" : ""}
            country={c}
            weather={null}
          />
        ))}
      </div>
    );
  } else {
    return <> too many matches, specify another filter </>;
  }

};

export default Countries;
