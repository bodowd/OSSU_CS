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

  const Country = ({ country, type }) => {
    if (type === "detailed") {
      return <CountryWithInfo country={country} />;
    }
    return (
      <div>
        {country.name}
        <button onClick={() => setShow(country.name)}>show</button>
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

  //   if (props.toShow.length > 10) {
  //     return <div>Too many matches, specify another filter</div>;
  //   } else if (props.toShow.length > 1 && props.toShow.length <= 10) {
  //     return (
  //       <div>
  //         {props.toShow.map((c) => (
  //           <Country key={c.name} type="" country={c} />
  //         ))}
  //       </div>
  //     );
  //   } else {
  //       console.log(props.toShow);
  //     return (
  //       <div>
  //         {props.toShow.map((c) => (
  //           <Country key={c.name} type="detailed" country={c} />
  //         ))}
  //       </div>
  //     );
  //   }
};

export default Countries;
