import diagnosesEntries from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosesEntries
}

const getDiagnosis = (code: string): Diagnosis | undefined => {
    return diagnosesEntries.find(d => d.code === code)
}

export default {
    getDiagnoses,
    getDiagnosis
}