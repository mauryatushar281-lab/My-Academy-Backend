import express from "express";

const router = express.Router();

/* SAVE PROGRESS */
router.post("/save", async (req, res) => {
    try {
        res.json({ message: "Progress saved", data: req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;