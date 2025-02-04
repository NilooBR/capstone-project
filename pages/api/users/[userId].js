import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } else if (req.method === "DELETE") {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
