import { Router } from "express";
import { myOrder, newOrder, allOrder, singleOrder, processOrder, deleteOrder } from "../controllers/order.controllers.js";
import adminOnly from "../middleware/auth.js";
const router = Router();

router.post('/new',newOrder );
router.get('/my-order', myOrder);
router.get('/all', adminOnly, allOrder);
router.get('/:id', singleOrder);
router.put('/:id', adminOnly, processOrder);
router.delete('/:id', adminOnly, deleteOrder);

export default router