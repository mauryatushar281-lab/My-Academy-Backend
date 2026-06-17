import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        paymentStatus: {
            type: String,
            default: "pending"
        },

        enrolledAt: {
            type: Date,
            default: Date.now
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