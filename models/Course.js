import mongoose from "mongoose";
// Lesson Schema
const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        notesUrl: {
            type: String,
            default: ""
        },
        duration: {
            type: String,
            default: "10 min"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: true
    });

// Course Schema
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        thumbnail: {
            type: String,
            default: ""
        },
        instructor: {
            type: String,
            default: ""
        },
        duration: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            default: 0
        },
        lessons: [
            lessonSchema
        ]
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model(
    "Course",
    courseSchema
);


export default Course;




// import mongoose from "mongoose";

// const lessonSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },

//     videoUrl: {
//         type: String,
//         required: true,
//     },

//     notesUrl: {
//         type: String,
//         default: "",
//     },

//     duration: {
//         type: String,
//         default: "10 min",
//     },
// });


// const courseSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true
//         },

//         thumbnail: {
//             type: String,
//             default: ""
//         },

//         instructor: {
//             type: String,
//             default: ""
//         },


//         duration: {
//             type: String,
//             default: ""
//         },


//         price: {
//             type: Number,
//             default: 0
//         }

//     },
//     {
//         timestamps: true
//     }
// );



// // const courseSchema = new mongoose.Schema(
// //     {
// //         title: String,

// //         description: String,

// //         thumbnail: String,

// //         lessons: [lessonSchema],
// //     },
// //     { timestamps: true }
// // );

// export default mongoose.model("Course", courseSchema);