import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import encountersData from "../data/encounters.json";

function Encounters() {
  const navigate = useNavigate();
  const location = useLocation();
  const [consultationType, setConsultationType] = useState(
    location.state?.filters?.consultationType || ""
  );

  const [fromDate, setFromDate] = useState(
    location.state?.filters?.fromDate || ""
  );

  const [toDate, setToDate] = useState(
    location.state?.filters?.toDate || ""
  );

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const encounters = encountersData.data || [];

  // unique dropdown values (FIX FOR YOUR DROPDOWN ISSUE)
  const uniqueTypes = [
    ...new Set(encounters.map((e) => e.consultation_type))
  ];

  const filtered = encounters.filter((e) => {
    const typeMatch =
      consultationType === "" ||
      (e.consultation_type || "")
        .toLowerCase()
        .trim() === consultationType.toLowerCase().trim();

    const date = new Date(e.date_of_service);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const dateMatch =
      (!from || date >= from) &&
      (!to || date <= to);

    return typeMatch && dateMatch;
  });

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return (
    <>
      

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Encounters</h2>

          {/* FILTERS */}
          <div style={{ marginBottom: 10 }}>
            <select
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
            >
              <option value="">All</option>

              {/* FIXED DROPDOWN */}
              {uniqueTypes.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              type="date"
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              type="date"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Consultation Type</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((e) => {
                const patientId = e.patient?.id;

                return (
                  <tr
                    key={e.id}
                    onClick={() => {
                      if (!patientId) return;

                      navigate(`/patient-details?id=${patientId}`, {
                        state: {
                          from: "encounters",
                          filters: {
                            consultationType,
                            fromDate,
                            toDate,
                          },
                        },
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{e.date_of_service}</td>
                    <td>
                      {e.patient?.first_name} {e.patient?.last_name}
                    </td>
                    <td>{e.consultation_type}</td>
                  </tr>
                );
              })}
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

export default Encounters;