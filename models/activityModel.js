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
    description: {
        type: String,
        required: true,
    },
    activity_type: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
})

export default mongoose.model("activity", activitySchema);