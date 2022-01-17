import patientEntries from "../../data/patients";
import { PatientEntry, publicPatient, NewPatient } from "../types";
import {v1 as uuid} from 'uuid'

const getPatients = (): Array<publicPatient> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid()
  const newPatientEntry = {
    id: id,
    ...entry
  }
  patientEntries.push(newPatientEntry);
  return newPatientEntry
}

export default {
  getPatients,
  addPatient
};
