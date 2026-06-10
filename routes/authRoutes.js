// routes/authRoutes.js

import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";


import {
    registerUser,
    loginUser,
} from "../controllers/authController.js";

const router = express.Router();

/* Email Authentication */

router.post("/register", registerUser);

router.post("/login", loginUser);

/* Google Authentication */

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
    (req, res) => {
        try {
            const token = jwt.sign(
                {
                    id: req.user._id,
                    email: req.user.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            console.log("JWT Generated:", token);

            return res.redirect(
                `http://localhost:5173/google-success?token=${token}`
            );
        } catch (err) {
            console.log("Callback Error:", err);
            return res.redirect("http://localhost:5173/login");
        }
    }
);

export default router;

