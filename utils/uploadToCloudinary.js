export const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "my-academy-profiles",

                // ✅ FIX IMAGE SIZE
                transformation: [
                    { width: 400, height: 400, crop: "fill", gravity: "face" }
                ]
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(fileBuffer);
    });
};