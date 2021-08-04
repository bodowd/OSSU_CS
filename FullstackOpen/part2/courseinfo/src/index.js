import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, v) => (acc = acc + v.exercises), 0);
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.ex}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((p) => (
        <Part key={p.id} name={p.name} ex={p.exercises} />
      ))}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((c) => (
        <Course course={c} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
