import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// POST COURSE
router.post("/create", async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;