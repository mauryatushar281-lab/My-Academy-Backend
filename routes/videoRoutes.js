import express from "express";
import uploadVideo from "../middleware/uploadVideoMiddleware.js";

const router = express.Router();

router.post("/upload-video", uploadVideo.single("video"), (req, res) => {
    try {
        res.json({
            url: req.file.path, // Cloudinary video URL
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;