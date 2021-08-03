import React, { useState } from "react";

const ShowText = (props) => {
  return <h1>{props.text}</h1>;
};

const ShowCounts = (props) => {
  return <p>{props.text} {props.count}</p>
}

const Statistics = (props) => {
  const gd = props.good
  const nt = props.neutral * 0
  const bd = props.bad * -1
  const sum = props.good + props.neutral + props.bad
  const avg = (gd + nt + bd) / sum

  if (sum == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <p>
      <ShowCounts text="good" count={props.good} />
      <ShowCounts text="neutral" count={props.neutral} />
      <ShowCounts text="bad" count={props.bad} />
      <ShowCounts text="average" count={avg} />
      <ShowCounts text="positive" count={`${(props.good / sum) * 100}%`} />
    </p>
  )
}

const CalcPositive = (props) => {
  const all = props.good + props.bad + props.neutral
  return (
    (props.good / all) * 100
  )
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
