import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    shippingInfo :{
        address:{
        type: String,
        required: true,
        },
        state:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
         pincode:{
            type: Number,
            required: true,
        },
    },
    user: {
        type: String,
        ref: "user",
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered'],
        default: 'Processing',
    },
    orderItems: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        productId:{ 
        type: mongoose.Types.ObjectId, 
        ref: 'product' 
    },
  }
],
    
}, {timestamps: true});

export const Order = mongoose.model('order', orderSchema);