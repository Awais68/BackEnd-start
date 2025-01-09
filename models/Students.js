import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      min: 0,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\s+@\s+\.\s+$/, "Please enter a valid email"],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Students = mongoose.model("students", studentSchema);

export default Students;
