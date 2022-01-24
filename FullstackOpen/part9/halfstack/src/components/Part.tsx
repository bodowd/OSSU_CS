import React from "react";
import Content from "./Content";
// import { CoursePartBase, CoursePart } from "../types";

interface PartsProps {
  type: string;
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
  requirements?: string[];
}

export default function Part(props: PartsProps) {
  let component = (
    <Content name={props.name} exerciseCount={props.exerciseCount} />
  );
  let description = null;
  switch (props.type) {
    case "normal":
      description = (
        <div>
          <i>{props.description}</i>
        </div>
      );
      break;
    case "groupProject":
      component = (
        <Content name={props.name} exerciseCount={props.exerciseCount} />
      );
      description = <div>project exercises {props.groupProjectCount}</div>;
      break;
    case "submission":
      component = (
        <Content name={props.name} exerciseCount={props.exerciseCount} />
      );
      description = <div>submit to {props.exerciseSubmissionLink}</div>;
      break;
    case "special":
        description = <div>required skills: {props.requirements?.join(", ")}</div>
        break;
    default:
      break;
  }

  return (
    <div>
      {component}{description}
    </div>
  );
}
