import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Addtask from "./pages/Addtask";
import Home from "./pages/Home";
// import Update from "./pages/Updatetask";

export default function App() {
  const [task, setTask] = React.useState([]);
  return (
    <Router>
      <Navbar task={task} setTask={setTask} />
      <Routes>
        <Route path="/" element={<Home task={task} setTask={setTask} />} />
        <Route path="/add" element={<Addtask />} />
        {/* <Route path="/update/:id" element={<Update />} /> */}
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}
