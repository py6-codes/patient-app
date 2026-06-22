
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import patientsData from "../data/patients.json";

function Patients() {
  const navigate = useNavigate();
  const location = useLocation();

  const [referral, setReferral] = useState(
    location.state?.filters?.referral || ""
  );

  const [gender, setGender] = useState(
    location.state?.filters?.gender || []
  );

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const patients = patientsData.data || [];

  const filtered = patients.filter((p) => {
    const referralMatch =
      referral === "" || p.referral_program === referral;

    const genderMatch =
      gender.length === 0 || gender.includes(p.gender);

    return referralMatch && genderMatch;
  });

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const toggleGender = (g) => {
    setGender((prev) =>
      prev.includes(g)
        ? prev.filter((x) => x !== g)
        : [...prev, g]
    );
  };

  return (
    <>

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Patients</h2>

          {/* FILTERS */}
          <select
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          >
            <option value="">All</option>
            <option value="UCLA Health">UCLA Health</option>
            <option value="DTC_Proactive">DTC_Proactive</option>
            <option value="outreach">outreach</option>
          </select>

          {/* GENDER FILTER */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={gender.includes("male")}
                onChange={() => toggleGender("male")}
              />
              Male
            </label>

            <label>
              <input
                type="checkbox"
                checked={gender.includes("female")}
                onChange={() => toggleGender("female")}
              />
              Female
            </label>

            <label>
              <input
                type="checkbox"
                checked={gender.includes("other")}
                onChange={() => toggleGender("other")}
              />
              Other
            </label>
          </div>

          {/* TABLE */}
          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Referral</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p.id}
                  onClick={() =>
                    navigate(`/patient-details?id=${p.id}`, {
                      state: {
                        from: "patients",
                        filters: { referral, gender },
                      },
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{p.email}</td>
                  <td>{p.first_name + " " + p.last_name}</td>
                  <td>{p.gender}</td>
                  <td>{p.referral_program}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div style={{ marginTop: 10 }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span> Page {page} </span>
            <button
              disabled={start + pageSize >= filtered.length}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Patients;