
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
    
    googleId: {
      type: String,
      default: "",
},


    password: {
      type: String,
      required: function () {
    return !this.googleId;
  },
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
    resetToken:{
    type:String,
    default:null
},

resetTokenExpire:{
    type:Date,
    default:null
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