import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
} from "../controllers/userController.js";


const router = express.Router();


// GET ALL STUDENTS
router.get("/students", async (req, res) => {
    try {
        const students = await User.find({
            role: "student"
        })
            .select("-password");
        res.json(students);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});


router.get(
    "/profile",
    authMiddleware,
    getProfile
);


router.put(
    "/profile",
    authMiddleware,
    upload.single("photo"),
    updateProfile
);
router.post(
    "/forgot-password",
    forgotPassword
);
router.post(
    "/reset-password",
    resetPassword
);

export default router;





// import express from "express";

// import { getProfile } from "../controllers/userController.js";

// import authMiddleware  from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/profile", authMiddleware, getProfile);

// export default router;