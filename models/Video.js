import mongoose from "mongoose";


const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: String,

        videoUrl: {
            type: String,
            required: true
        },

        thumbnail: String,

        duration: String,

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }

    },
    {
        timestamps: true
    });


export default mongoose.model(
    "Video",
    videoSchema
);