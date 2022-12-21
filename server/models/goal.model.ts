import { model, Schema } from "mongoose";

const goalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Please enter your goal"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", goalSchema);
