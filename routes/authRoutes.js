
import express from "express";
import passport from "passport";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    registerUser,
    loginUser,
    googleCallback,
    getMe,
} from "../controllers/authController.js";

const router = express.Router();

/* ================= EMAIL AUTH ================= */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* ================= GOOGLE AUTH ================= */
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login",
        session: false,
    }),
    googleCallback
);

/* ================= USER INFO ================= */
router.get("/me", authMiddleware, getMe);

export default router;


// import express from "express";
// import passport from "passport";
// import jwt from "jsonwebtoken";

// import {
//     registerUser,
//     loginUser,
// } from "../controllers/authController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// /* Email Authentication */

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// /* Google Authentication */

// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//     })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         failureRedirect: "http://localhost:5173/login",
//         session: false,
//     }),
//     (req, res) => {
//         try {
//             const token = jwt.sign(
//                 {
//                     id: req.user._id,
//                     email: req.user.email,
//                 },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "7d" }
//             );

//             const user = encodeURIComponent(
//                 JSON.stringify({
//                     id: req.user._id,
//                     name: req.user.name,
//                     email: req.user.email,
//                     role: req.user.role,
//                     photo: req.user.photo,
//                 })
//             );

//             console.log("JWT Generated:", token);

//             return res.redirect(
//                 `http://localhost:5173/google-success?token=${token}`
//             );
//         } catch (err) {
//             console.log("Callback Error:", err);
//             return res.redirect("http://localhost:5173/login");
//         }
//     }
// );

// router.get("/me", authMiddleware, async (req, res) => {
//     res.json(req.user);
// });

// export default router;

