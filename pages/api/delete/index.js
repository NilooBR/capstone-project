import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { public_id } = req.body;

    if (!public_id) {
      res.status(400).json({ message: "Missing file ID" });
      return;
    }

    const result = await cloudinary.v2.uploader.destroy(public_id);

    if (result.result !== "ok") {
      throw new Error("Cloudinary deletion failed");
    }

    res.status(200).json({ message: "File deleted successfully", result });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "File deletion failed", error });
  }
}
