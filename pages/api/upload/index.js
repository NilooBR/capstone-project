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

    const images = [];
    for (const file of files.uploadedImages) {
      const { filepath, newFilename } = file;

      const result = await cloudinary.v2.uploader.upload(filepath, {
        public_id: newFilename,
        folder: "nf",
      });

      images.push(result);
    }

    response.status(200).json({ images });
  } catch (error) {
    console.error("File upload error:", error);
    response
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
}
