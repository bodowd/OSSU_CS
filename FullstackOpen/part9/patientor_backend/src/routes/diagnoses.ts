import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.status(200).json(diagnosesService.getDiagnoses());
});

export default diagnosisRouter;
