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

export default patientRouter;