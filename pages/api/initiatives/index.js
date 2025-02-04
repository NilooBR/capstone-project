import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";
import jwt from "jsonwebtoken";

function getUserIdFromToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return { error: "Unauthorized: No token provided" };

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) return { error: "Unauthorized: Invalid token" };
    return { userId: decoded.userId };
  } catch (err) {
    return { error: "Unauthorized: Invalid or expired token" };
  }
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { userId, error } = getUserIdFromToken(req);
      if (error)
        return res.status(401).json({ success: false, message: error });

      const { title, description, deadline, tags } = req.body;

      const newInitiative = await Initiative.create({
        title,
        description,
        deadline,
        tags,
        isCompleted: false,
        userId,
      });

      return res.status(201).json({ success: true, data: newInitiative });
    } catch (error) {
      console.error("Error creating initiative:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create initiative." });
    }
  }

  if (req.method === "GET") {
    try {
      const { userId, error } = getUserIdFromToken(req);
      if (error)
        return res.status(401).json({ success: false, message: error });

      const initiatives = await Initiative.find({ userId }).populate("tasks");

      return res.status(200).json({ success: true, data: initiatives });
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch initiatives." });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed." });
}
