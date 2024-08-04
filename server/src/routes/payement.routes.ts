import { Router } from "express";
import { allCoupons, applyDiscount, deleteCoupons, newCoupon } from "../controllers/payment.controllers.js";
import adminOnly from "../middleware/auth.js";
const router = Router();

//api/v1/payment/discount
router.get('/discount', applyDiscount);

//api/v1/payment/coupon/new
router.post('/coupon/new', adminOnly, newCoupon);

//api/v1/payment/coupon/new
router.get('/coupon/all', adminOnly, allCoupons);

//api/v1/payment/coupon/new
router.delete('/coupon/:id', adminOnly, deleteCoupons);


export default router;