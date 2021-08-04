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

  const nextAnec = () => {
    // console.log('Selected is: ', selected)
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const addVote = () => {
    //  if votes[selected] is undefined, set it to zero
    // const curr = votes[selected] || 0
    const curr = votes[selected]
    setVotes({...votes, [selected]: curr + 1})
  };

  return (
    <div>
      {anecdotes[selected]}
      {/* if votes doesn't have the key yet, just display 0. Otherwise votes[selected] will return undefined */}
      <div>has {votes[selected] || 0 } votes</div>
      <div>
        <Button handleClick={addVote} text="vote" />
        <Button handleClick={nextAnec} text="next anecdote" />
      </div>
    </div>
  );
};

export default App;
