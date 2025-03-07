import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: [true, "company name is required"],
    },
    position: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: [true, "position is required"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
