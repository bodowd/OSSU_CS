import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toNewEntry } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.status(200).json(patientService.getPatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientService.getPatientDetail(req.params.id);
  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.getPatientDetail(req.params.id)
    const entry = toNewEntry(req.body);
    // make sure we can find the patient
    if (patient && entry) {
    const addEntry = patientService.addEntry(patient, entry);
    res.status(200).json(addEntry);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json(errorMessage);
  }
});

export default patientRouter;
