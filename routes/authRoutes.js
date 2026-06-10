// routes/authRoutes.js

import express from "express";
import passport from "passport";

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
        failureRedirect: "/login",
    }),
    (req, res) => {
        res.redirect("http://localhost:5173");
    }
);

export default router;

