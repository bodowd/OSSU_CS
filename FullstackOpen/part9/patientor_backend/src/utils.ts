import { NewPatient, Gender } from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ( {name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDOB(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    }
    return newEntry
}

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name")
    }
    return name
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDOB = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date)
    }
    return date
}

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)){
        throw new Error("Incorrect or missing SSN")
    }
    return ssn
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender)
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation")
    }
    return occupation
}

export default toNewPatientEntry