import diagnosesEntries from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosesEntries
}

export default {
    getDiagnoses
}