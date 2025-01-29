import Task from "@/db/models/Task";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  if (request.method !== "DELETE") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const { taskId } = request.query;
  const { public_id } = request.body;

  if (!public_id) {
    return response.status(400).json({ message: "Missing file ID" });
  }

  try {
    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(public_id);
    
    if (cloudinaryResponse.result !== "ok") {
      throw new Error("Cloudinary deletion failed");
    }

    await Task.findByIdAndUpdate(taskId, {
      $pull: { uploadedImages: { id: public_id } },
    });

    return response.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return response.status(500).json({ message: "File deletion failed", error: error.message });
  }
}