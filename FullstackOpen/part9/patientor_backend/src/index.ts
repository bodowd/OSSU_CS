import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients"

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  res.status(200).json({ test: "data" });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
