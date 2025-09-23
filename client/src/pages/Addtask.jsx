import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Addtask = () => {
  const [task, settask] = useState({
    task: "",
    completed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    settask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance
      .post("/add", task)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit}
        className=" flex justify-center items-center p-2.5 md:w-1/2 rounded-md bg-blue-100 gap-1"
      >
        <input
          className="p-1 border-2 border-blue-300 rounded-md bg-amber-50"
          type="text"
          placeholder="Add task"
          onChange={handleChange}
          name="task"
        />
        <label className="text-blue-500">
          Done:{" "}
          <input
            type="checkbox"
            name="completed"
            onChange={handleChange}
            checked={task.completed}
          />
        </label>
        <button className=" p-2 bg-blue-400 text-amber-50 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default Addtask;
