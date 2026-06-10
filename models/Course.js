import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    videoUrl: {
        type: String,
        required: true,
    },

    notesUrl: {
        type: String,
        default: "",
    },

    duration: {
        type: String,
        default: "10 min",
    },
});

const courseSchema = new mongoose.Schema(
    {
        title: String,

        description: String,

        thumbnail: String,

        lessons: [lessonSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Course", courseSchema);