import mongoose from "mongoose";
import "./Task";
const { Schema } = mongoose;

const InitiativeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: "Deadline must be in the future.",
    },
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default mongoose.models.Initiative ||
  mongoose.model("Initiative", InitiativeSchema);
