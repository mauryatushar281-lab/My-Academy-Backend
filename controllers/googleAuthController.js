import jwt from "jsonwebtoken";

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

        return res.redirect(
            `http://localhost:5173/google-success?token=${token}&user=${user}`
        );
    } catch (err) {
        console.log("Google Callback Error:", err);
        return res.redirect("http://localhost:5173/login");
    }
};