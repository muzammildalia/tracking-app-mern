import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
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
        unique: true,
    },
    duration: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
})

export default mongoose.model("activity", activitySchema);