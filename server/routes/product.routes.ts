import express from 'express';
const productRoute = express.Router();
import { addProduct } from '../controllers/product.controller';
import verifyUserByJwt from '../middlewares/verifyUserByJwt';
import multerFileUpload from '../middlewares/multer-config/multerFileUpload';


// Product routes : 

productRoute.post("/add-product", verifyUserByJwt, multerFileUpload.single("image"), addProduct)
productRoute.put("/edit-product")
productRoute.delete("/delete-product")
productRoute.get("/get-all-products") // Get all products
productRoute.get("/get-product/")  // Get single product


export default productRoute;