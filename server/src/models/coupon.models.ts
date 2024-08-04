import mongoose, {Schema} from "mongoose";


const couponSchema = new Schema({
    couponCode: {
        type: String,
        required: [true, "Please enter Coupon Code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Please enter discount amount"],
    },
});

export const Coupon = mongoose.model('coupon', couponSchema);