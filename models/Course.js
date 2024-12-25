import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    course: String,
    completed: { type: Boolean, default: "" },
    thumbnail: String,
  },
  { timestamps: true }
);

const course = mongoose.model("Course", courseSchema);

export default course;
