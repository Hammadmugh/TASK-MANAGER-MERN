import Task from "../models/taskModel.js";

const createTask = async (req, res) => {
  try {
    const { task, completed } = req.body;
    if (!task) return res.status(200).json({ message: "Please add task" });

    const data = await Task.create({ task, completed, user: req.user.id });
    await data.save();
    res.status(200).json({ message: "Task added" });
  } catch (error) {
    console.error(error);
  }
};

const getTasks = async (req, res) => {
  try {
    const data = await Task.find({ user: req.user.id });
    if (!data) return res.status(200).json({ message: "No task found" });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findOne({ _id: id, user: req.user.id });
    if (!data)
      return res.status(200).json({ message: "No task with this id found" });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const incompleteTask = async (req, res) => {
  try {
    const data = await Task.find({ completed: false, user: req.user.id });
    const alldata = await Task.find({ user: req.user.id });
    if (data.length === 0) {
      return res.status(200).json({ message: "All tasks completed" });
    }
    if (!alldata) {
      return res.status(200).json({ message: "Nothing found at all" });
    }
    res.status(200).json({ message: "Incomplete task(s)" });
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { task, completed } = req.body;
    const { id } = req.params;
    const data = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        task,
        completed,
      },
      { new: true }
    );
    if (!data) {
      return res.status(200).json({ message: "No task found" });
    }
    if (!completed) {
      return res.status(200).json({ message: "Task marked pending" });
    }
    await data.save();
    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!data) {
      return res.status(200).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
  }
};

const deleteCompleted = async (req, res) => {
  try {
    const data = await Task.deleteMany({ completed: true, user: req.user.id });
    if (data.deletedCount === 0) {
      return res.status(200).json({ message: "No task completed yet" });
    }
    res.status(200).json({ message: "Completed task(s) deleted." });
  } catch (error) {
    console.error(error);
  }
};

export default {
  createTask,
  getTasks,
  getTask,
  incompleteTask,
  updateTask,
  deleteTask,
  deleteCompleted,
};
