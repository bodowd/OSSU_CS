import React, { useState } from "react";

const App = () => {
  // the function body that defines the component begins with this function call:
  const [counter, setCounter] = useState(0);
  // the function call adds state to the component and renders it initialized with the value of 0
  // the function returns an array with two items, which we assign to counter and setCounter by using the destructuring assignment syntax
  // counter variable is assigned the initial value of state which is 0
  // setCounter variable is assigned to a function that will be used to modify the state


//   one way to do it:
//   const handleClick = () => {
//     console.log("clicked");
//     setCounter(counter + 1);
//   };

    const increaseByOne = () => setCounter(counter+1)
    const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
};

export default App;
