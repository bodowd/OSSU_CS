import React, { useState } from "react";


const App = () => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    //  could be written as:
    // const handleLeftClick = () =>
    //  setClicks({...clicks, left: clicks.left + 1 })
    const handleLeftClick = () => {
        const newClicks = {
            ...clicks,
            left: clicks.left +1
        }
        setClicks(newClicks)
    }

    const handleRightClick = () => {
        const newClicks = {
            ...clicks,
            right: clicks.right + 1
        }
        setClicks(newClicks)
    }
    return (
        <div>
            {clicks.left}
            <button onClick={handleLeftClick}>
                left
            </button>
            <button onClick={handleRightClick}>
                right
            </button>
            {clicks.right}
        </div>
    )
};
export default App;


// Handling arrays

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(" ")}</p>
    </div>
  );
};

// function returning function
const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  );
};
