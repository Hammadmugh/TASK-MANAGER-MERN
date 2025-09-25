import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Addtask from "./pages/Addtask";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  const [task, setTask] = React.useState([]);
  const token = localStorage.getItem("token");
  return (
    <Router>
      {token ? <Navbar task={task} setTask={setTask} /> : null}
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home task={task} setTask={setTask} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Addtask />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/update/:id" element={<Update />} /> */}
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}
