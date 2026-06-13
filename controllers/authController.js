import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
    req,
    res
) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        const existingUser =
            await User.findOne({
                email,
            });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                name,
                email,
                password:
                    hashedPassword,
            });

        res.status(201).json({
            success: true,
            message:
                "Registration successful",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


/* GOOGLE CALLBACK (IMPORTANT PART) */
export const googleCallback = (req, res) => {
        try {
            const token = jwt.sign(
                {
                    id: req.user._id,
                    email: req.user.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const user = encodeURIComponent(
                JSON.stringify({
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    role: req.user.role,
                    photo: req.user.photo,
                })
            );

            console.log("JWT Generated:", token);

            return res.redirect(
                `http://localhost:5173/google-success?token=${token}`
            );
        } catch (err) {
            console.log("Callback Error:", err);
            return res.redirect("http://localhost:5173/login");
        }
    };


/* GET PROFILE */
export const getMe = (req, res) => {
    res.json(req.user);
};




