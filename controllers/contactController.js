import Contact from "../models/Contact.js";


export const createContact = async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;


        const newMessage = await Contact.create({
            name,
            email,
            subject,
            message
        });


        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};