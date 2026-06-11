import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
    getProfile,
    updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

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

export default router;





// import express from "express";

// import { getProfile } from "../controllers/userController.js";

// import authMiddleware  from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/profile", authMiddleware, getProfile);

// export default router;