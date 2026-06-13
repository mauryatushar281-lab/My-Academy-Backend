import Course from "../models/Course.js";
// CREATE COURSE
export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const AddLectures = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        course.lectures.push(req.body);

        await course.save();

        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};