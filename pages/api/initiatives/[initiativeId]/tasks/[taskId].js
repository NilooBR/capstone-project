import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  const { initiativeId, taskId } = req.query;

  if (req.method === "POST") {
    try {
      const { title, description, status } = req.body;

      if (!initiativeId || !mongoose.Types.ObjectId.isValid(initiativeId)) {
        return res.status(400).json({ success: false, message: "Invalid initiative ID." });
      }

      if (!title || !description || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      const initiativeObjectId = new mongoose.Types.ObjectId(initiativeId);

      const newTask = await Task.create({
        title,
        description,
        status,
        initiative: initiativeObjectId,
      });

      const initiative = await Initiative.findById(initiativeObjectId);
      if (!initiative) {
        return res.status(404).json({ success: false, message: "Initiative not found." });
      }

      initiative.tasks.push(newTask._id);
      await initiative.save();

      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
    return;
  }

  if (req.method === "GET") {
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      const initiative = await Initiative.findById(initiativeId);
      if (!initiative || !initiative.tasks.includes(taskId)) {
        return res
          .status(404)
          .json({ success: false, message: "Task not associated with initiative" });
      }

      res.status(200).json({ success: true, data: task });
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }

  res.status(405).json({ success: false, message: "Method not allowed." });
}