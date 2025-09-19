import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const Update = () => {
  const [task, settask] = useState({
    task: "",
    completed: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      const update = async () => {
        const { data } = await axios.get(`http://localhost:5001/task/${id}`);
        console.log(data);
        settask(data);
      };
      update();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    settask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .put(`http://localhost:5001/task/${id}`, task)
      .then((res) => {
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((error) => toast.error(error.response.data.message));
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
          placeholder="Update task"
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
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
