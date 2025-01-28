import mongoose from "mongoose";
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
      type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
      ref: "Task",
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Initiative ||
  mongoose.model("Initiative", InitiativeSchema);