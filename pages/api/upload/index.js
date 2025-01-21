import formidable from "formidable";
import cloudinary from "cloudinary";

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
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }

  const form = formidable({});
  try {
    const [fields, files] = await form.parse(request);

    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const uploadedFiles = [];
    for (const file of files.uploadedFiles) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new Error(`Unsupported file type: ${file.mimetype}`);
      }

      const result = await cloudinary.v2.uploader.upload(file.filepath, {
        resource_type: "raw",
        public_id: file.newFilename,
        folder: "nf",
      });
      uploadedFiles.push(result);
    }

    response.status(201).json({ files: uploadedFiles });
  } catch (error) {
    console.error("File upload error:", error);
    response
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
}
