import patientEntries from "../../data/patients";
import { PatientEntry, publicPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<publicPatient> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientDetail = (id: string): PatientEntry | undefined => {
  const patientsDetails = patientEntries.map(
    ({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
  return patientsDetails.find((p)=> p.id === id)
};

export default {
  getPatients,
  addPatient,
  getPatientDetail,
};
