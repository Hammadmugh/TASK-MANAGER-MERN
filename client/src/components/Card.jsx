import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

import { toast } from "react-toastify";

const Card = ({ task, wholetask }) => {
  const deleteTask = async (id) => {
    const confirmation = confirm("Want to delete the task?");
    if (confirmation) {
      return await axios
        .delete(`http://localhost:5001/task/${id}`)
        .then((response) => {
          wholetask((prev) => prev.filter((t) => t._id !== id));
          toast.success(response.data.message);
        })
        .catch((error) => toast.error(error.response.data.message));
    }
  };

  const handleChange = async (e) => {
    const { name, type, checked, value } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    wholetask((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, [name]: updatedValue } : t))
    );

    try {
      await axios
        .put(`http://localhost:5001/task/${task._id}`, {
          [name]: updatedValue,
        })
        .then((response) => {
          toast.success(response.data.message);
        });
    } catch (error) {
      toast.error("Failed to update task");

      wholetask((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, [name]: !updatedValue } : t
        )
      );
    }
  };
  return (
    <div className="grid grid-cols-2 p-7 rounded-2xl bg-blue-100 m-2.5">
      <section className="flex justify-center gap-2 items-center">
        <p>{task.task}</p>
        <input
          type="checkbox"
          name="completed"
          onChange={handleChange}
          checked={task.completed}
        />
      </section>
      <section className="flex justify-end items-center gap-0.5">
        <button
          onClick={() => deleteTask(task._id)}
          className="p-2 rounded-sm bg-red-400 cursor-pointer"
        >
          <FaTrashAlt />
        </button>
        {/* <Link to={`/update/${task._id}`} className="p-2 rounded-sm bg-blue-400">
          <CiEdit />
        </Link> */}
      </section>
    </div>
  );
};

export default Card;
