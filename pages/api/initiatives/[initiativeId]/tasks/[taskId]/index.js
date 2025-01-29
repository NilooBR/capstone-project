import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId, taskId } = request.query;

  try {
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

    if (request.method === "PATCH") {
      const updateData = request.body;

      if (taskId) {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData);
        if (!updatedTask) {
          return response
            .status(404)
            .json({ success: false, message: "Task not found." });
        }
        return response
          .status(200)
          .json({ success: true, message: "Task successfully updated." });
      } else {
        const updatedInitiative = await Initiative.findByIdAndUpdate(
          initiativeId,
          updateData
        );
        if (!updatedInitiative) {
          return response
            .status(404)
            .json({ success: false, message: "Initiative not found." });
        }
        return response
          .status(200)
          .json({ success: true, message: "Initiative successfully updated." });
      }
    }

    if (request.method === "DELETE") {
      await Initiative.findByIdAndUpdate(initiativeId, {
        $pull: { tasks: taskId },
      });

      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return response
          .status(404)
          .json({ success: false, message: "Task not found." });
      }

      return response
        .status(200)
        .json({ success: true, message: "Task deleted successfully." });
    }

    response
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  } catch (error) {
    console.error("API Error:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal Server error" });
  }
}
