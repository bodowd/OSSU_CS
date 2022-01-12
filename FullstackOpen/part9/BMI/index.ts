import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json())

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

app.post("/exercises", (req, res) => {
    if (Object.keys(req.body).length < 2) {
        res.status(401).json({error: "parameters missing"})
    }

    const dailyExercises = req.body.daily_exercises.map((f: string) => Number(f))
    const target = Number(req.body.target)

    if (dailyExercises.filter((i: number) => isNaN(i)).length !== 0) {
        res.status(401).json({error: "Malformatted parameters in daily_exercises"})
    } else if (isNaN(target)) {
        res.status(401).json({error: "Malformatted parameters in target"})
    } else {
        const result = calculateExercises(dailyExercises, target)
        res.status(200).json(result)

    }

})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

