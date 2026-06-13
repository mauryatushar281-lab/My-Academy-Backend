import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "my-academy-videos",
        resource_type: "video", // IMPORTANT
    },
});

const uploadVideo = multer({ storage: videoStorage });

export default uploadVideo;