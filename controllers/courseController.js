import Course from "../models/Course.js";


// CREATE COURSE
export const createCourse = async (req, res) => {
    try {

        const {
            title,
            thumbnail,
            instructor,
            duration,
            price,
            category
        } = req.body;


        const course = await Course.create({
            title,
            thumbnail,
            instructor,
            duration,
            price
        });


        res.status(201).json({
            success: true,
            message: "Course created",
            course
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const AddLectures = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        course.lectures.push(req.body);

        await course.save();

        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCourses = async (req, res) => {

    try {

        const courses =
            await Course.find();


        res.status(200).json(courses);


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// here for update cousrse 


export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(
            req.params.id
        );
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        course.title =
            req.body.title ?? course.title;
        course.description =
            req.body.description ?? course.description;
        course.thumbnail =
            req.body.thumbnail ?? course.thumbnail;


        course.category =
            req.body.category ?? course.category;
        // category
        course.instructor =
            req.body.instructor ?? course.instructor;
        course.duration =
            req.body.duration ?? course.duration;
        course.price =
            req.body.price ?? course.price;
        course.lessons =
            req.body.lessons ?? course.lessons;
        const updatedCourse = await course.save();
        res.status(200).json({
            success: true,
            message: "Course Updated",
            course: updatedCourse
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};



// here for delete course 

export const deleteCourse = async (req, res) => {

    try {


        const course = await Course.findByIdAndDelete(
            req.params.id
        );


        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }


        res.json({

            success: true,

            message: "Course deleted"

        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// export const updateCourse = async (req, res) => {

//     try {

//         const course = await Course.findById(
//             req.params.id
//         );


//         if (!course) {

//             return res.status(404).json({
//                 message: "Course not found"
//             });

//         }


//         course.title =
//             req.body.title || course.title;


//         course.thumbnail =
//             req.body.thumbnail || course.thumbnail;


//         course.instructor =
//             req.body.instructor || course.instructor;


//         course.duration =
//             req.body.duration || course.duration;


//         course.price =
//             req.body.price || course.price;



//         await course.save();


//         res.json({
//             success: true,
//             message: "Course Updated",
//             course
//         });



//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }

// };


// // CREATE COURSE
// export const createCourse = async (req, res) => {
//     try {
//         const course = await Course.create(req.body);
//         res.status(201).json(course);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };