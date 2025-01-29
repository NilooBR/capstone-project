import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId } = request.query;

  if (!initiativeId || !mongoose.Types.ObjectId.isValid(initiativeId)) {
    return response.status(400).json({
      success: false,
      error: "Invalid or missing initiativeId.",
    });
  }

  if (request.method === "GET") {
    const initiative = await Initiative.findById(initiativeId).populate(
      "tasks"
    );
    if (!initiative) {
      return response.status(404).json({
        success: false,
        error: "Initiative not found.",
      });
    }
    response.status(200).json({ success: true, data: initiative });
    return;
  }

  if (request.method === "PUT") {
    try {
      const updatedInitiative = request.body;
      const result = await Initiative.findByIdAndUpdate(
        initiativeId,
        updatedInitiative
      );

      if (!result) {
        return response.status(404).json({ status: "Initiative not found" });
      }

      return response
        .status(200)
        .json({ status: "Initiative successfully updated", data: result });
    } catch (error) {
      console.error("Error updating initiative:", error);
      return response
        .status(500)
        .json({ status: "Internal server error", error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {  
      const deletedInitiative = await Initiative.findByIdAndDelete(initiativeId);
      deletedInitiative.tasks.forEach(async (taskId) => {
        await Task.findByIdAndDelete(taskId) 
      });
      response.status(200).json("Initiative successfully deleted");
      return;
    } catch (error) {
      console.error("Error updating initiative:", error);
      return response
        .status(500)
        .json({ status: "Internal server error", error: error.message });
    }
  }
}
