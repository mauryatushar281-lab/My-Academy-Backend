import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },

        completedLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model(
    "Enrollment",
    enrollmentSchema
);