import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name} </h1>;
};

function App() {
  return (
    <div>
      <Welcome name="Bond"/>
    </div>
  );
}

export default App;
