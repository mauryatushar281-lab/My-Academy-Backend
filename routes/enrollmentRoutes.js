import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    enrollCourse
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post(
    "/enroll",
    authMiddleware,
    enrollCourse
);



export default router;