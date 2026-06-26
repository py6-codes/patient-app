import "./../App.css";

function Header({ onLogout }) {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">🏥</div>

        <div className="logo-text">
          <h2>MediCare</h2>
          <p>Patient Management System</p>
        </div>
      </div>

      <div className="quote">
        ❤️ Caring Beyond Medicine
      </div>

      <div className="admin">
        <div className="admin-info">
          <h4>Welcome, Admin</h4>
          <p>Have a great day!</p>
        </div>

        <div className="admin-avatar">
          👨‍⚕️
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;