import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();




// Cloudinary config :
cloudinary.config({
    cloud_name: process.env.APP_CLOUD_NAME,
    api_key: process.env.APP_API_KEY,
    api_secret: process.env.APP_API_SECRET
});

console.log();


// Cloudinary uploader : 
const uploadOnCloudinary = async (imageURL: string) => {
    try {
        const file = await cloudinary.uploader.upload(imageURL, { resource_type: "auto" })
        console.log("cloudinary file is -> ", file);

        if (file) {
            return file.url
        }
    } catch (error: any) {
        console.log("Could not upload the image ", error.message);
    }
};
export default uploadOnCloudinary;
