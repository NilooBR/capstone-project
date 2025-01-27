import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const initiatives = await Initiative.find().populate("tasks");
      response.status(200).json({ success: true, data: initiatives });
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      response.status(500).json({
        success: false,
        message: "Failed to fetch initiatives.",
      });
    }
    return;
  }

  if (request.method === "POST") {
    try {
      const { title, description, deadline } = request.body;

      if (!title || !description || !deadline) {
        response.status(400).json({
          success: false,
          message: "Missing required fields: title, description, deadline.",
        });
        return;
      }

      const newInitiative = await Initiative.create({ title, description, deadline });
      response.status(201).json({ success: true, data: newInitiative });
    } catch (error) {
      console.error("Error creating initiative:", error);
      response.status(500).json({
        success: false,
        message: "Failed to create initiative.",
      });
    }
    return;
  }

  response.status(405).json({ success: false, message: "Method not allowed." });
}