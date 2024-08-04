import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
     name: {
        type: String,
        required: [true, "Please enter your Username."],
        unique: true,
    },
     image: {
        type: String,
        required: [true, "Please Upload image."],
     },
     price: {
        type: Number,
        required: [true, "Please enter the price of the product."],
     },
     stock : {
        type: Number,
        required: [true, "Please enter the stock of the product."],
     },
     description: {
        type: String,
        required: [true, "Please enter the description of the product."],
     },
     category: {
        type: String,
        trim: true,
        required: [true, "Please enter the category of the product."],
     }
    },
    {timestamps: true});
    
    export const Product = mongoose.model('product', productSchema);