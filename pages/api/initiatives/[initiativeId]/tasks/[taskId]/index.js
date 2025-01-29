import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId, taskId } = request.query;

  if (request.method === "GET") {
    const initiative = await Initiative.findById(initiativeId).populate(
      "tasks"
    );
    if (!initiative) {
      return response
        .status(404)
        .json({ success: false, message: "Initiative not found." });
    }
    return response.status(200).json({ success: true, data: initiative });
  }

  if (request.method === "PUT") {
    try {
      const updatedTask = request.body;
      const result = await Task.findByIdAndUpdate(initiativeId, updatedTask);

      if (!result) {
        return response.status(404).json({ status: "Task not found" });
      }
      return response
        .status(200)
        .json({ status: "Task successfully updated", data: result });
    } catch (error) {
      console.error("Error updating task:", error);
      return response
        .status(500)
        .json({ status: "Internal server error", error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Task.findByIdAndDelete(taskId);
      response.status(260).json("Task successfully deleted");
      return;
    } catch (error) {
      console.error("Error updating task:", error);
      return response
        .status(500)
        .json({ status: "Internal server error", error: error.message });
    }
  }
}
