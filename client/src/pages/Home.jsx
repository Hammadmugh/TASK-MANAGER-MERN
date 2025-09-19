import React, { useEffect } from "react";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import Card from "../components/Card";

const Home = ({ task, setTask }) => {
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/tasks");
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
        <Card
          wholetask={setTask}
          id={data._id}
          key={data._id}
          task={data.task}
          isdone={data.completed ? <MdOutlineDone /> : <RxCrossCircled />}
        />
      ))}
    </div>
  );
};

export default Home;
