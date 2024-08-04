import { Router } from "express";
import { deleteUser, getAllUser, getUser, registerUser } from "../controllers/user.controllers.js";
import adminOnly from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router = Router();

//api/v1/user/new
router.post('/register', upload, registerUser);

//api/v1/user/all
router.get('/all', adminOnly, getAllUser);

//api/v1/user/:id
router.get('/:id', getUser);

//api/v1/user/new/delete/:id
router.delete('/delete/:id', adminOnly, deleteUser);

export default router