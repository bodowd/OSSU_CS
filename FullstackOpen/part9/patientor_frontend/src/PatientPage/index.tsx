import React from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { addEntry, setPatientDetails, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
// import Diagnoses from "./Diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import {
  isHealthCheckEntry,
  isHospitalEtry,
  isOccupationalHealthcareEntry,
} from "../utils";

export default function index() {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getEntryType = (values: EntryFormValues) => {
    let type;
    if (isHealthCheckEntry(values)) {
      type = "HealthCheck";
    } else if (isOccupationalHealthcareEntry(values)) {
      type = "OccupationalHealthcare";
    } else if (isHospitalEtry(values)) {
      type = "Hospital";
    }
    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const type = getEntryType(values);

    const entry = { ...values, type };

    try {
      const { data: entryInfo } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(entryInfo));
      closeModal();
    } catch (e) {
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  let iconName: "man" | "woman" | "genderless";

  if (patient) {
    switch (patient.gender) {
      case "male":
        iconName = "man";
        break;
      case "female":
        iconName = "woman";
        break;
      case "other":
        iconName = "genderless";
        break;
      default:
        iconName = "genderless";
    }
  } else {
    iconName = "genderless";
  }

  return (
      <div>
        <h2>
          {patient?.name}
          <Icon name={iconName} /> Hi
        </h2>
        <div>
          <span>ssn: {patient?.ssn}</span>
        </div>
        <div>
          <span>occupation: {patient?.occupation}</span>
        </div>
        <br></br>
        <div>
          <h3>Entries</h3>
          <div>
            {patient?.entries?.map((entry: Entry) => {
              console.log(entry);
              return <EntryDetails key={entry.id} entry={entry} />;
            })}
          </div>
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
  );
}
