import React, { useState } from 'react'

const App = () =>{
    // the function body that defines the component begins with this function call:
    const [ counter, setCounter ] = useState(0)
    // the function call adds state to the component and renders it initialized with the value of 0
    // the function returns an array with two items, which we assign to counter and setCounter by using the destructuring assignment syntax
    // counter variable is assigned the initial value of state which is 0
    // setCounter variable is assigned to a function that will be used to modify the state


    // the application calls the setTimeout function and passes it two parameters
    // setCounter function is used to increment the counter state
    // then timeout is used to timeout for one second
    // when the state modifying function setCounter is called, React re-renders the component, which re-executes the function body of the component function
    setTimeout(
        () => setCounter(counter + 1),
        1000
    )
    return (
        <div>{counter}</div>
    )
}

export default App
