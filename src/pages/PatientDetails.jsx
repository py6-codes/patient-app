import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import patientsData from "../data/patients.json";

function PatientDetails() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  const id = params.get("id");

  if (!id) return <h3>Invalid Patient</h3>;

  const patient = patientsData.data.find(
    (p) => String(p.id) === String(id)
  );

  if (!patient) return <h3>No Patient Found</h3>;

  const from = location.state?.from;

  const goBack = () => {
    navigate(from === "encounters" ? "/encounters" : "/patients", {
      state: location.state,
    });
  };

  return (
    <div style={{ padding: 20 }}>
      {/* BREADCRUMB */}
      <div style={{ marginBottom: 15 }}>
        <span
          onClick={goBack}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {from === "encounters" ? "Encounters" : "Patients"}
        </span>

        {" > Patient Details"}
      </div>

      {/* DETAILS */}
      <h2>Patient Details</h2>

      <p>Email: {patient.email}</p>
      <p>Name: {patient.first_name + " " + patient.last_name}</p>
      <p>DOB: {patient.dob || "N/A"}</p>
      <p>Gender: {patient.gender}</p>
    </div>
  );
}

export default PatientDetails;