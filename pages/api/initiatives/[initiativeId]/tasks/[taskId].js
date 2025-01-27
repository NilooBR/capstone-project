import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  const { taskId } = request.query;

  if (request.method === "GET") {
    try {
      const task = await Task.findById(taskId);
      response.status(200).json(task);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error fetching task", details: error.message });
    }
    return;
  }

  response.status(405).json({ error: "Method not allowed" });
}
