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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const form = formidable({
    multiples: true,
    maxFileSize: 2 * 1024 * 1024,
    filter: ({ mimetype }) =>
      [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(mimetype),
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    const uploadedFiles = [];
    for (const fileKey in files) {
      const file = files[fileKey];
      const { filepath } = file;

      const result = await cloudinary.v2.uploader.upload(filepath, {
        folder: "tasks",
        resource_type: "auto",
      });

      uploadedFiles.push({
        url: result.secure_url,
        public_id: result.public_id,
        original_filename: result.original_filename,
      });
    }

    res.status(201).json({ uploadedFiles });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
}
