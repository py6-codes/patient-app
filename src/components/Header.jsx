function Header({ onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ccc"
      }}
    >
      <h3>Patient App</h3>

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;