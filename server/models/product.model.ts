import mongoose from "mongoose";




export interface IProduct extends Document {
    user: mongoose.Schema.Types.ObjectId,
    title: string,
    image?: string,
    description: string,
    category: string,
    ratings: number,
    color: string,
}


// Product schema : 

const productSchema = new mongoose.Schema<IProduct>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Product title is required !"],
    },
    image: {
        type: String,
        required: [true, "Product is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    category: {
        type: String,
        required: [true, "Category is required!"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
    }
}, { timestamps: true })


// Product model : 
const productModel = mongoose.model("Product", productSchema);
export default productModel;