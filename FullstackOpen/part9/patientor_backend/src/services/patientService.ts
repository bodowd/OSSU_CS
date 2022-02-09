import patientEntries from "../../data/patients";
import { PatientEntry, publicPatient, NewPatient, newEntry } from "../types";
import { v1 as uuid } from "uuid";

const allPatients = patientEntries.map(
  ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  })
);

const getPatients = (): Array<publicPatient> => {
  return allPatients;
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
  return patientsDetails.find((p) => p.id === id);
};

const addEntry = (patient: PatientEntry, entry: newEntry) => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };
  patient.entries.push(newEntry);
  return patient; 
};

export default {
  getPatients,
  addPatient,
  getPatientDetail,
  addEntry,
};
