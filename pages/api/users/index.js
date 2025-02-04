import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find().select("-password");
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = await User.create({ name, email, password, role });

      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
