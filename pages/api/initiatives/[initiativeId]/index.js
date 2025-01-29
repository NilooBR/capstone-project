import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { initiativeId } = request.query;

  try {
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

    if (request.method === "PATCH") {
      const updatedInitiative = await Initiative.findByIdAndUpdate(
        initiativeId,
        request.body,
        { new: true }
      );
      if (!updatedInitiative) {
        return response.status(404).json({
          success: false,
          error: "Initiative not found for update.",
        });
      }
      response
        .status(200)
        .json({ success: true, message: "Initiative successfully updated." });
      return;
    }

    if (request.method === "DELETE") {
      const deletedInitiative = await Initiative.findByIdAndDelete(
        initiativeId
      );
      if (!deletedInitiative) {
        return response.status(404).json({
          success: false,
          error: "Initiative not found for deletion.",
        });
      }
      response
        .status(200)
        .json({ success: true, message: "Initiative successfully deleted." });
      return;
    }

    response
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  } catch (error) {
    console.error("API Error:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
