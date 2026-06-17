import express from "express";
import { createContact } from "../controllers/contactController.js";


const router = express.Router();


router.post(
    "/send",
    createContact
);


export default router;