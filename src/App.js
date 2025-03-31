import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/signup"; // Ensure correct import
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoutes";
import History from "./components/History";
import Sidebar from "./components/sidebar"; // Ensure correct import
import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar should only appear on private routes */}
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="d-flex">
                  <Sidebar />
                  <div className="flex-grow-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
