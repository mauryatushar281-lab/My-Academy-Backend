import express from "express";

import {
    getCourseLearning,
    markLessonComplete,
} from "../controllers/learningController.js";

const router = express.Router();

router.get(
    "/:courseId",
    getCourseLearning
);

router.put(
    "/complete",
    markLessonComplete
);

export default router;

