import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { taskId } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(taskId)
    if (!task) {
      return response
        .status(404)
        .json({ success: false, message: "Task not found." });
    }
    return response.status(200).json({ success: true, data: task });
  }

  if (request.method === "PUT") {
    try {
      const updatedTask = request.body;
      const result = await Task.findByIdAndUpdate(taskId, updatedTask);

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
      response.status(200).json("Task successfully deleted");
      return;
    } catch (error) {
      console.error("Error updating task:", error);
      return response
        .status(500)
        .json({ status: "Internal server error", error: error.message });
    }
  }
}
