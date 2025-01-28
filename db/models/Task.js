import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  uploadedImages: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
