import { Request, Response } from "express"
import { Coupon } from "../models/coupon.models.js";

const newCoupon = async (req: Request, res: Response ) => {
 const {couponCode, amount} = req.body;

 try {
if(!couponCode || !amount) {
     return res.status(400).json({
         status: 400,
         message: 'Please provide coupon code and amount'
     });
} 
 const coupon = await Coupon.create({couponCode, amount});
 return res.json({
     status: 201,
     message: `Coupon ${couponCode} created successfully`,
 });

} catch (error) {
 return res.json({
     status: 500,
     message: 'Error creating coupon'
 });
 }};

const applyDiscount = async (req: Request, res: Response) => {
 const {couponCode} = req.query;
 try {
   const dicount = await Coupon.findOne({couponCode}) ;
   if(!dicount){
     return res.status(404).json({
         status: 404,
         message: 'Invalid coupon ID'
     });
   }

   return res.json({
     status: 200,
     discount: dicount.amount
   })
 } catch (error) {
    return res.json({
        status: 500,
        message: 'Error applying coupon'
    });
 }};

 const allCoupons = async (req:Request, res:Response) => {
 try {
    const coupon = await Coupon.find({});
    if(!coupon){
        return res.status(404).json({
            status: 404,
            message: 'No coupon found'
        });
    };

    return res.json({
        status: 200,
        coupon
    });
 } catch (error) {
    return res.json({
        status: 500,
        message: 'Error fetching coupons'
    })
 }};

 const deleteCoupons = async (req:Request, res:Response) => {
    const {id} = req.params;
    try {
       const coupon = await Coupon.findByIdAndDelete(id);
    
       return res.json({
           status: 200,
           message: `Coupon ${coupon?.couponCode} deleted successfully`
       });
    } catch (error) {
       return res.json({
           status: 500,
           message: 'Error deleting coupon'
       });
    }}

export {newCoupon, applyDiscount,allCoupons,deleteCoupons}