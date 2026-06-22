
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ccc" }}>
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/encounters">Encounters</Link>
        </li>

        <li>
          <Link to="/patients">Patients</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;