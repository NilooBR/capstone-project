import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId } = request.query;

  if (request.method === "POST") {
    try {
      const { title, description, status } = request.body;

      const newTask = await Task.create({
        title,
        description,
        status,
      });

      await Initiative.findByIdAndUpdate(initiativeId, {
        $push: { tasks: newTask._id },
      });

      response.status(201).json({ success: true, task: newTask });
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
    return;
  }

  if (request.method === "GET") {
    try {
      const initiative = await Initiative.findById(initiativeId).populate("tasks");
      response.status(200).json({ success: true, initiative });
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
    return;
  }

  response.status(405).json({ success: false, message: "Method not allowed." });
}
