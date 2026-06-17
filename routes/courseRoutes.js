import express from "express";
import Course from "../models/Course.js";
import { createCourse, AddLectures, getCourses, updateCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get(
    "/",
    getCourses
);
// UPDATE COURSE
router.put(
    "/update/:id",
    updateCourse
);
// POST COURSE
router.post("/create", createCourse);

/* ADD LECTURE */
router.post("/add-lecture/:courseId", AddLectures);

export default router;
