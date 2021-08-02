import React, { useState } from "react";


const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  return (
    <div>
      {value}
      {/* on click needs to have a function returned to it. Not a function _call_ */}
      <button onClick={setToValue(value*1000)}>thousand</button>
      <button onClick={setToValue(value*1000000)}>million</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  );
};

export default App;
