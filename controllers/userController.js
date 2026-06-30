
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Enrollment from "../models/Enrollment.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import transporter from "../config/mail.js";


export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        // here for enrollment
        const enrollments = await Enrollment.find({
            userId: user._id,
            paymentStatus: "success"
        })
            .populate("courseId");
        const courses = enrollments.map((item) => ({
            _id: item.courseId._id,
            title: item.courseId.title,
            description: item.courseId.description,
            progress:
                item.completedLessons.length > 0
                    ? 20
                    : 0
        }));

        // console.log("ENROLLMENTS:", enrollments);
        // console.log("Courses:", courses);

        // here enrollment end 
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            courses: courses,
            enrolledCourses: user.enrolledCourses || 0,
            certificates: user.certificates || 0,
            progress: user.progress || 0,
            learningHours: user.learningHours || 0,

            // courses: user.courses || [],
            activities: user.activities || [],
            createdAt: user.createdAt,
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};



export const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;


        if (req.file) {

            console.log("CLOUDINARY FILE:", req.file);


            user.photo = req.file.path;
            // Cloudinary URL

        }


        await user.save();


        res.status(200).json({
            message: "Profile updated",
            user
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};
// here for forgot password
export const forgotPassword = async (req, res) => {


    try {
        const { email, phone } = req.body;
        const user = await User.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const token =
            crypto.randomBytes(32)
                .toString("hex");
        user.resetToken = token;
        user.resetTokenExpire =
            Date.now() + 15 * 60 * 1000;
        await user.save();
        console.log("TOKEN SAVED IN DATABASE:");
        console.log(user.resetToken);
        // create link
        const resetURL =
            `http://localhost:5173/reset-password/${token}`;
        console.log(
            "RESET LINK:",
            resetURL
        );

        // here for send email
        //     await transporter.sendMail({
        //         from: process.env.EMAIL_USER,
        //         to: user.email,
        //         subject: "My Academy Password Reset",
        //         html: `
        // <h2>Password Reset Request</h2>
        // <p>Hello ${user.name},</p>
        // <p>Click below to reset your password:</p>
        // <a href="${resetURL}">
        //     Reset Password
        // </a>
        // <p>This link expires in 15 minutes.</p>
        // `
        //     });
        // here end 
        res.json({
            message:
                "Reset link generated",
            resetURL
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

export const resetPassword = async (req, res) => {

    try {

        const { token, password } = req.body;
        console.log("TOKEN FROM FRONTEND:");
        console.log(token);
        const user = await User.findOne({
            resetToken: token,
            // resetTokenExpire: {
            //     $gt: Date.now()
            // }
        });
        console.log("USER FOUND:");
        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "Reset link expired or invalid"
            });
        }

        if (user.resetTokenExpire < Date.now()) {
            return res.status(400).json({
                message: "Token expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        res.json({
            message: "Password changed successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


// export const updateProfile = async (req, res) => {
//     try {

//         const user = await User.findById(req.user.id);


//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }


//         user.name = req.body.name || user.name;
//         user.phone = req.body.phone || user.phone;



//         if (req.file) {

//             const result =
//                 await cloudinary.uploader.upload(
//                     `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//                     {
//                         folder: "my-academy-profiles",

//                         // one image per user
//                         public_id: req.user.id,

//                         overwrite: true,

//                         invalidate: true
//                     }
//                 );


//             user.photo = result.secure_url;
//         }



//         await user.save();


//         res.json({
//             name: user.name,
//             phone: user.phone,
//             email: user.email,
//             photo: user.photo
//         });


//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };






// export const updateProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.name = req.body.name || user.name;
//         user.phone = req.body.phone || user.phone;

//         // ✅ If new image uploaded
//         if (req.file) {
//             // 🗑️ Delete old image if exists
//             if (user.photo) {
//                 const publicId = user.photo.split("/").pop().split(".")[0];

//                 await cloudinary.uploader.destroy(
//                     `my-academy-profiles/${publicId}`
//                 );
//             }

//             // 📤 Upload new image (replace old)
//             const result = await cloudinary.uploader.upload(
//                 `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`,
//                 {
//                     folder: "my-academy-profiles",
//                     public_id: req.user.id,  // fixed name per user
//                     overwrite: true,
//                     invalidate: true,
//                 }
//             );

//             user.photo = result.secure_url;
//         }

//         await user.save();

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const updateProfile = async (
//     req,
//     res
// ) => {
//     try {
//         const user = await User.findById(
//             req.user._id
//         );

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//             });
//         }

//         user.name =
//             req.body.name || user.name;

//         user.phone =
//             req.body.phone || user.phone;

//         if (req.file) {
//             user.photo = req.file.path;
//         }

//         await user.save();

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };