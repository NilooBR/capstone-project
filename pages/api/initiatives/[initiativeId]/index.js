import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId } = request.query;

  if (request.method === "GET") {
    try {
      const initiative = await Initiative.findById(initiativeId).populate(
        "tasks"
      );
      response.status(200).json({ success: true, data: initiative });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: "Failed to fetch initiative.",
      });
    }
    return;
  }

  response.status(405).json({ success: false, message: "Method not allowed." });
}
