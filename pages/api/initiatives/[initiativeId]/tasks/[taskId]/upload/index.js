import formidable from "formidable";
import cloudinary from "cloudinary";
import Task from "@/db/models/Task";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  const { taskId } = request.query;
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }

  const form = formidable({ multiples: true });

  try {
    const [fields, files] = await form.parse(request);

    const originalFilenames = Array.isArray(fields.originalFilenames)
      ? fields.originalFilenames
      : [fields.originalFilenames];

    const images = [];

    for (const [index, file] of files.uploadedImages.entries()) {
      const { filepath } = file;

      const result = await cloudinary.v2.uploader.upload(filepath, {
        folder: "nf",
      });

      images.push({
        url: result.secure_url,
        id: result.public_id,
        displayName: originalFilenames[index],
      });
    }
    await Task.findByIdAndUpdate(
      taskId,
      { $push: { uploadedImages: {$each: images}}},
    )

    response.status(200).json({ images });
  } catch (error) {
    console.error("File upload error:", error);
    response
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
}
