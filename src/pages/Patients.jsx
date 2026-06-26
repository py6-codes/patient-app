
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import patientsData from "../data/patients.json";
import Table from "../components/Table";

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
      prev.includes(g) /*Adds or removes a gender from the selected gender list*/
        ? prev.filter((x) => x !== g) /*removes a gender*/
        : [...prev, g]
    );
  };

  return (
    <>

      <div className="page">
        <Sidebar />

        <div className="content">
          <h2 className="page-title">Patients</h2>

          {/* FILTERS */}
          <div className="filters">
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
          </div>

          {/* TABLE */}
          <Table
            columns={["Email", "Name", "Gender", "Referral"]}
          >
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
           >
           <td>{p.email}</td>

          <td>
          {p.first_name} {p.last_name}
         </td>
          <td>{p.gender}</td>
          <td>{p.referral_program}
          </td>
         </tr>
         ))}
        </Table>

          {/* PAGINATION */}
          <div className="pagination">
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