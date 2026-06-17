
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


export const enrollCourse = async (req, res) => {

    try {

        const userId = req.user.id;

        const { courseId } = req.body;


        if (!courseId) {

            return res.status(400).json({
                message: "Course id required"
            });

        }


        const course =
            await Course.findById(courseId);


        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }



        // check duplicate

        const already =
            await Enrollment.findOne({

                userId: userId,

                courseId: courseId

            });



        if (already) {

            return res.status(400).json({

                message: "Already enrolled"

            });

        }



        const enrollment =
            await Enrollment.create({

                userId: userId,

                courseId: courseId,

                paymentStatus: "success"

            });



        res.status(201).json({

            message: "Course enrolled successfully",

            enrollment

        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            message: error.message

        });

    }

};





// import Enrollment from "../models/Enrollment.js";
// import Course from "../models/Course.js";
// import User from "../models/User.js";

// export const enrollCourse = async (req, res) => {

//     try {
//         const userId = req.user.id;
//         const { courseId } = req.body;
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({
//                 message: "Course not found"
//             });
//         }
//         // prevent duplicate
//         const already = await Enrollment.findOne({
//             user: userId,
//             course: courseId
//         });
//         if (already) {
//             return res.status(400).json({
//                 message: "Already enrolled"
//             });
//         }
//         const enrollment =
//             await Enrollment.create({
//                 user: userId,
//                 course: courseId,
//                 paymentStatus: "success"
//             });
//         res.json({
//             message: "Course enrolled successfully",
//             enrollment
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }

// };