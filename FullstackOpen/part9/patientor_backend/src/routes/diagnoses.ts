import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.status(200).json(diagnosesService.getDiagnoses());
});

diagnosisRouter.get("/:code", (req, res) => {
  const diagnosis = diagnosesService.getDiagnosis(req.params.code)
  if (diagnosis) {
    res.status(200).json(diagnosis)
  } else {
    res.status(404)
  }
})

export default diagnosisRouter;
