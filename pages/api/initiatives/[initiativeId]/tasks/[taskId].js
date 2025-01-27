import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  const { initiativeId, taskId } = request.query;

  if (request.method === "POST") {
    try {
      const { title, description, status } = request.body;
      const newTask = await Task.create({
        title,
        description,
        status,
        initiative: initiativeId,
      });
      await Initiative.findByIdAndUpdate(initiativeId, {
        $push: { tasks: newTask._id },
      });

      response.status(201).json({ message: "Task created", task: newTask });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error creating task", details: error.message });
    }
    return;
  }

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
