import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getCourseLearning = async (
    req,
    res
) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(
            courseId
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const markLessonComplete =
    async (req, res) => {
        try {
            const {
                userId,
                courseId,
                lessonId,
            } = req.body;

            let enrollment =
                await Enrollment.findOne({
                    userId,
                    courseId,
                });

            if (!enrollment) {
                enrollment =
                    await Enrollment.create({
                        userId,
                        courseId,
                        completedLessons: [],
                    });
            }

            if (
                !enrollment.completedLessons.includes(
                    lessonId
                )
            ) {
                enrollment.completedLessons.push(
                    lessonId
                );
            }

            await enrollment.save();

            res.json({
                success: true,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };