export enum Gender {
    Male = "male",
    Female = "female"
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<PatientEntry, "id">

export type publicPatient = Omit<PatientEntry, "ssn">;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}