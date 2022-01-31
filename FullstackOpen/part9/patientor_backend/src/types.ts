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
    entries: Entry[];
}

export type NewPatient = Omit<PatientEntry, "id">

export type publicPatient = Omit<PatientEntry, "ssn" | "entries">;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {
}
