import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

const Card = ({ task, isdone, id, wholetask }) => {
  const deleteTask = async (id) => {
    return await axios
      .delete(`http://localhost:5001/task/${id}`)
      .then((response) => {
        wholetask((prev) => prev.filter((t) => t._id !== id));
        toast.success(response.data.message);
      })
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <div className="grid grid-cols-2 p-7 rounded-2xl bg-blue-100 m-2.5">
      <section className="flex justify-center gap-2 items-center">
        <p>{task}</p>
        <p>{isdone}</p>
      </section>
      <section className="flex justify-end items-center gap-0.5">
        <button
          onClick={() => deleteTask(id)}
          className="p-2 rounded-sm bg-red-400 cursor-pointer"
        >
          <FaTrashAlt />
        </button>
        <Link to={`/update/${id}`} className="p-2 rounded-sm bg-blue-400">
          <CiEdit />
        </Link>
      </section>
    </div>
  );
};

export default Card;
