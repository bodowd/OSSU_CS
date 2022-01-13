export type Gender = "male" | "female";

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}