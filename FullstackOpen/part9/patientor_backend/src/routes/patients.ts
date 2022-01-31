import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.status(200).json(patientService.getPatients())
})

patientRouter.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry)
        res.status(200).json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

patientRouter.get("/:id", (req, res) => {
    const patient = patientService.getPatientDetail(req.params.id);
    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(404)
    }
})

export default patientRouter;