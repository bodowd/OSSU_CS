import React from "react";
import { Diagnosis, Entry } from "../types";
import { useStateValue } from "../state";

interface DiagnosesProps {
  entry: Entry;
}

const Diagnoses: React.FC<DiagnosesProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {entry.diagnosisCodes?.map((code: string, i: number) => {
        const diagnosis = diagnoses?.filter(
          (diagnosis: Diagnosis) => diagnosis.code === code
        );
        return (
          <li key={`${entry.id}-${i}`}>
            <span>{code}</span>{" "}
            <span>{diagnosis?.length > 0 && diagnosis[0].name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;
