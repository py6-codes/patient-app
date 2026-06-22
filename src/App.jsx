import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Encounters from "./pages/Encounters";
import PatientDetails from "./pages/PatientDetails";
import Header from "./components/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/encounters" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* ENCOUNTERS */}
      <Route
        path="/encounters"
        element={
          isLoggedIn ? (
            <>
              <Header onLogout={handleLogout} />
              <Encounters />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* PATIENTS */}
      <Route
        path="/patients"
        element={
          isLoggedIn ? (
            <>
              <Header onLogout={handleLogout} />
              <Patients />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* PATIENT DETAILS */}
      <Route
        path="/patient-details"
        element={
          isLoggedIn ? (
            <>
              <Header onLogout={handleLogout} />
              <PatientDetails />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

    </Routes>
  );
}

export default App;