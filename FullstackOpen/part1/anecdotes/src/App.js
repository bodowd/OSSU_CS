import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})
  const [mostVotes, setMostVotes] = useState(0)

  const nextAnec = () => {
    // console.log('Selected is: ', selected)
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const addVote = () => {
    //  if votes[selected] is undefined, set it to zero
    // const curr = votes[selected] || 0
    const curr = votes[selected]
    setVotes({...votes, [selected]: curr + 1})

    // find highest value in the object
    const highestCount = Math.max(...Object.values(votes))
    // kind the key corresponding to the highest object otherwise return null. Returns an array [key, value]
    const maxKey = Object.entries(votes).find(([k,v]) => v === highestCount ? k : null)
    setMostVotes(maxKey[0])
  };


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <Button handleClick={addVote} text="vote" />
        <Button handleClick={nextAnec} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
    </div>
  );
};

export default App;
