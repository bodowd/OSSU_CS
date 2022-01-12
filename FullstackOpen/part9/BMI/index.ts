import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    if (!isNaN(height) && !isNaN(weight)) {
        const bmiResult = calculateBmi(height, weight)
        const result = {
            weight: weight,
            height: height,
            bmi: bmiResult
        }
        res.status(200).json(result)
    } else {
        res.status(401).json({error: "Malformatted parameters"})
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})