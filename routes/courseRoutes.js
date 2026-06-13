import express from "express";
import Course from "../models/Course.js";
import { createCourse, AddLectures } from "../controllers/courseController.js";

const router = express.Router();

// POST COURSE
router.post("/create", createCourse);

/* ADD LECTURE */
router.post("/add-lecture/:courseId", AddLectures);

export default router;
