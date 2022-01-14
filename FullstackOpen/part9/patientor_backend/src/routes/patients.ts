import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.status(200).json(patientService.getPatients())
})

export default patientRouter;