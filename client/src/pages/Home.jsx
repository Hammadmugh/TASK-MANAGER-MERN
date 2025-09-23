import React, { useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import axiosInstance from "../utils/axiosInstance";

const Home = ({ task, setTask }) => {
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axiosInstance.get("/tasks");
        setTask(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="md:grid md:grid-cols-3">
      {task.map((data) => (
        <Card wholetask={setTask} key={data._id} task={data} />
      ))}
    </div>
  );
};

export default Home;
