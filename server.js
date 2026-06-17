
// import "./env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/authRoutes.js";
import "./config/passport.js"; // IMPORTANT
import learningRoutes from "./routes/learningRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error(
            "MongoDB Connection Error:",
            error
        );
    });

// Session
app.use(
    session({
        secret: process.env.JWT_SECRET || "myacademy",
        resave: false,
        saveUninitialized: false,
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/progress", progressRoutes);
app.use(
    "/api/enrollment",
    enrollmentRoutes
);
// Test Route
app.get("/", (req, res) => {
    res.send("MyAcademy API Running");
});
app.use(
    "/api/learning",
    learningRoutes
);
app.use("/api/users", userRoutes);
app.use(
    "/api/contact",
    contactRoutes
);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});