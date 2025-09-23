import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/register", formData);

      const loginRes = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", loginRes.data.token);

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Error signing up");
    }
  };
  return (
    <div className="flex justify-center items-center mt-15">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col items-center p-10 md:w-1/2 rounded-md bg-blue-100 gap-4"
      >
        <h1 className="text-2xl font-bold text-blue-500">Register</h1>
        <input
          className="md:w-2/3 p-1 border-2 border-blue-300 rounded-md bg-amber-50"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <input
          className="md:w-2/3 p-1 border-2 border-blue-300 rounded-md bg-amber-50"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <button className=" cursor-pointer w-2/3 p-2 bg-blue-400 text-amber-50 rounded-md">
          Register
        </button>
        <p className="text-gray-700">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
