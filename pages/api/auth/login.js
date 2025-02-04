import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ success: true, message: "Login successful", token });
}
