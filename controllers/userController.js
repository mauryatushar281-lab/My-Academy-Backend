import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,

            enrolledCourses: user.enrolledCourses.length,
            certificates: user.certificates || 0,
            progress: user.progress || 0,
            learningHours: user.learningHours || 0,

            courses: user.courses || [],
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
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;

        // ✅ If new image uploaded
        if (req.file) {
            // 🗑️ Delete old image if exists
            if (user.photo) {
                const publicId = user.photo.split("/").pop().split(".")[0];

                await cloudinary.uploader.destroy(
                    `my-academy-profiles/${publicId}`
                );
            }

            // 📤 Upload new image
            const result = await uploadToCloudinary(req.file.buffer);

            user.photo = result.secure_url;
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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