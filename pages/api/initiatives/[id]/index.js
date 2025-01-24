import dbConnect from "@/db/connect";
import Initiative from "@/db/models/Initiative";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const initiatives = await Initiative.find().populate('tasks');
      res.status(200).json({ success: true, data: initiatives });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      res.status(500).json({ success: false, message: 'Unable to fetch initiatives.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}