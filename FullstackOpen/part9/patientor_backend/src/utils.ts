import {
  NewPatient,
  Gender,
  Entry,
  newEntry,
  BaseEntry,
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newEntry;
};

export const toNewEntry = (newEntry: any): newEntry => {
  let validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Entry not valid");

  let entry: Omit<BaseEntry, "id"> = {
    date: parseDate(validEntryType.date),
    description: parseDescription(validEntryType.description),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCode(validEntryType.diagnosisCodes),
  };

  switch (validEntryType.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHealthCheckRating(
          validEntryType.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseEmployerName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave),
      };
    default:
      return assertNever(validEntryType);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseEntry = (entry: any): newEntry => {
  if (!entry || !isValidNewEntryType) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }
  return entry;
};

const isValidNewEntryType = (entry: any): entry is newEntry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseDescription = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing description");
  }
  return text;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

// return type is an Array of Diagnosis["code"] just the code item from the Diagnosis object
const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnosis["code"]> => {
  // diagnosisCode is optional so could be null
  if (!diagnosisCode) return diagnosisCode;

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode. Not an array.");
  }
  // check if every element of the array is a string
  const validDiagnosisCodes = diagnosisCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCode;
  } else {
    throw new Error("Incorrect diagnosisCode. Not strings in the array.");
  }
};

const parseDischarge = (discharge: any): Discharge => {
  // discharge is optional. could be null
  if (
    !discharge ||
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  ) {
    return discharge;
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge date");
    }
    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge criteria");
    }
    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseDischargeCriteria(discharge.criteria);

    // returns a Discharge type object
    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

const parseDischargeCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employer name");
  }
  return name;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  // sickleave is optional
  if (
    !sickLeave ||
    (Object.keys(sickLeave).length === 0 && sickLeave.constructor === Object)
  ) {
    return sickLeave;
  } else {
    if (!sickLeave.startDate) {
      throw new Error("Incorrect or missing start date for sickleave");
    }
    if (!sickLeave.endDate) {
      throw new Error("Incorrect or missing end date for sickleave");
    }
    const startDate = parseDate(sickLeave.startDate);
    const endDate = parseDate(sickLeave.endDate);

    return { startDate, endDate };
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// const parseDOB = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }
//   return date;
// };

const parseDate = (date: unknown, dob: boolean = true): string => {
  if (!date || !isString(date) || !isDate(date)) {
    if (dob) {
      throw new Error("Incorrect or missing date of birth: " + date);
    }
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error(`Incorrect or missing entires: ${entries}`);
  }
  return entries;
};

export default toNewPatientEntry;
