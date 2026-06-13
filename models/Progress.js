import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
    {
        userId: String,
        courseId: String,
        lectureId: String,
        watchedTime: Number,
        completed: Boolean,
    },
    { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);