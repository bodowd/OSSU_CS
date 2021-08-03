import React, { useState } from "react";

const ShowText = (props) => {
  return <h1>{props.text}</h1>;
};

const ShowCounts = (props) => {
  return <p>{props.text} {props.count}</p>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <ShowText text="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <ShowText text="statistics" />
      <ShowCounts text="good" count={good} />
      <ShowCounts text="neutral" count={neutral} />
      <ShowCounts text="bad" count={bad} />
    </div>
  );
};

export default App;
