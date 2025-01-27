import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import Task from "@/db/models/Task";

export default async function handler(req, res) {
  await dbConnect();
  const { initiativeId } = req.query;

  if (req.method === "POST") {
    try {
      const { title, description, status, uploadedImages } = req.body;

      const newTask = await Task.create({
        title,
        description,
        status,
        uploadedImages: uploadedImages.map((img) => img.url),
        initiative: initiativeId,
      });

      await Initiative.findByIdAndUpdate(initiativeId, {
        $push: { tasks: newTask._id },
      });

      res.status(201).json({ success: true, task: newTask });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
    return;
  }

  if (req.method === "GET") {
    try {
      const tasks = await Initiative.findById(initiativeId)
        .populate("tasks")
        .select("tasks");
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: "Method not allowed." });
}
