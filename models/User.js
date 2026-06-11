
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    enrolledCourses: {
      type: Number,
      default: 0,
    },

    certificates: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    rank: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         name: String,

//         email: {
//             type: String,
//             unique: true,
//         },

//         password: String,
        
//         googleId: String,
//         photo: {
//             type: String,   // 👈 ADD THIS
//             default: "",
//         },

//         role: {
//             type: String,
//             default: "student",
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// export default mongoose.model("User", userSchema);