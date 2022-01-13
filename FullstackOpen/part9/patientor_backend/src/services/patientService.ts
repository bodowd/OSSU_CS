import patientEntries from "../../data/patients";
import { publicPatient } from "../types";

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

export default {
  getPatients,
};
