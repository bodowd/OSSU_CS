import React, { useState } from "react";

const CountryWithInfo = ({ country }) => {
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
    </div>
  );
};

const Countries = (props) => {
  const [show, setShow] = useState("");
  console.log(show);

  const toggle = (country) => {
      // if the country name is already set to show, then when this button is hit again, it will setShow to '' in order to hide
      if (show === country.name) {
          setShow('')
      }
      else {
          setShow(country.name)
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
          <CountryWithInfo country={country} />
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
          <Country key={c.name} type="detailed" country={c} />
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
          />
        ))}
      </div>
    );
  } else {
    return <> too many matches, specify another filter </>;
  }

};

export default Countries;
