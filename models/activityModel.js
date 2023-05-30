import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  person: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // unique: true,
  description: {
    type: String,
    required: true,
    unique: false,
  },
  activity_type: {
    type: String,
    required: true,
    unique: false,
  },
  duration: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("activity", activitySchema);
