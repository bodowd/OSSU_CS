import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { setPatientDetails, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

export default function index() {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
}
