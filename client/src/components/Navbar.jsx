import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiShow } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Navbar = ({ task, setTask }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };

  const deleteTask = async () => {
    if (task.length === 0) {
      return toast.error("No task to be deleted.");
    }
    const confirmation = confirm("Want to delete completed tasks?");
    if (confirmation) {
      return await axiosInstance
        .delete(`/completed`)
        .then((response) => {
          setTask((prev) => prev.filter((t) => t.completed === false));
          toast.success(response.data.message || "operation successful");
        })
        .catch((error) =>
          toast.error(response.data.message || "something wrong")
        );
    }
  };

  const showIncomplete = async () => {
    return await axiosInstance
      .get(`/incomplete`)
      .then((response) => {
        setTask((prev) => prev.filter((t) => t.completed === false));
        toast.success(response.data.message);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="md:grid md:grid-cols-2 flex flex-col items-center md:p-2 p-4 bg-blue-200">
      <Link to={"/"} onClick={refreshPage}>
        Task manager
      </Link>
      <section className="flex gap-1.5 justify-end">
        <button
          onClick={deleteTask}
          className="flex font-light text-sm justify-center items-center p-1 rounded-md bg-red-400 gap-0.5 cursor-pointer"
        >
          <FaTrashAlt />
          COMPLETED
        </button>
        <Link
          to={"/add"}
          className="flex font-light text-sm justify-center items-center p-1 rounded-md bg-green-300 gap-0.5"
        >
          <IoIosAddCircleOutline /> TASK
        </Link>
        <button
          onClick={showIncomplete}
          className="flex font-light text-sm justify-center items-center p-1 rounded-md bg-blue-400 gap-0.5 cursor-pointer"
        >
          <BiShow />
          INCOMPLETE
        </button>
        <button
          onClick={handleLogout}
          className="flex font-light text-sm justify-center items-center p-1 rounded-md bg-blue-400 gap-0.5 cursor-pointer"
        >
          <CiLogout />
          LOGOUT
        </button>
      </section>
    </div>
  );
};

export default Navbar;
