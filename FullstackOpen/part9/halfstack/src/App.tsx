import React from "react";
import Header from "./components/Header";
import Part from "./components/Part";
import Total from "./components/Total";
import { CoursePart } from "./types";

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisurely course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hardest course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      {courseParts.map((p) => {
        return (
          <div key={p.name}>
            <Part {...p} />
          </div>
        );
      })}
      <Total
        count={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  );
};

export default App;
