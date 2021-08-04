import React from "react";

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

export default Course
