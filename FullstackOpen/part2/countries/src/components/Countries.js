import React from "react";

const Country = ({ country }) => {
  return <div>{country.name}</div>;
};

const CountryWithInfo =({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(l => <li>{l.name}</li>)}
                </ul>
            </div>
            <img src={country.flag} width="250" height="200"></img>

        </div>
    )
}

const Countries = (props) => {
  if (props.toShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (props.toShow.length > 1 && props.toShow.length <= 10) {
    return (
      <div>
        {props.toShow.map((c) => (
          <Country key={c.name} country={c} />
        ))}
      </div>
    );
  } else {
    return (
        <div>
            {props.toShow.map(c => <CountryWithInfo key={c.name} country={c} />)}
        </div>
    )
  }
};

export default Countries;
