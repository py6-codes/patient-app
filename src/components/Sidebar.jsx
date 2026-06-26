import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <div className="hospital">🏥</div>

        <h2>MediCare</h2>

        <p>Patient Dashboard</p>
      </div>

      <ul>

        <li>
          <Link
            className={location.pathname === "/encounters" ? "active" : ""}
            to="/encounters"
          >
            🩺 Encounters
          </Link>
        </li>

        <li>
          <Link
            className={location.pathname === "/patients" ? "active" : ""}
            to="/patients"
          >
            👨‍⚕️ Patients
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;