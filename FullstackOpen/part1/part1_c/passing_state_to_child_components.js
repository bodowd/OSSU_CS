import React, { useState } from "react";


// refactor so that it's composed of three smaller components
// one component for displaying the counter and two components for buttons

// first a display component. Place the applications state in the App component and pass it down
// to the Display component through props
// since the component only uses the counter field of its props, we can simplify
// the component by using destructuring
const Display = ({ counter }) => {
    return (
        <div>{counter}</div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}
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
    const decreaseByOne = () => setCounter(counter-1)
    const setToZero = () => setCounter(0)

  return (
    <div>
        <Display counter={counter}/>
        <Button handleClick={increaseByOne} text='plus' />
        <Button handleClick={decreaseByOne} text='minus' />
        <Button handleClick={setToZero} text='zero' />
    </div>
  );
};

export default App;
