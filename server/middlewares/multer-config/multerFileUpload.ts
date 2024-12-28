import { Request } from 'express';
import multer from 'multer';




// Multer configurtion : 
const storage = multer.diskStorage({
    // Destination : 
    destination: (req: Request, filename, callback) => {
        callback(null, 'temp/uploads')
    },

    filename: (req: Request, filename, callback) => {
        callback(null, filename.originalname)
    }
});

const multerFileUpload = multer({ storage });
export default multerFileUpload;