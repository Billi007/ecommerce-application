import { Router } from "express";
const router = Router();
import { getallUser, registerUser,getUser, deleteUser } from "../controllers/user.controllers.js";
import { adminOnly } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

// route - /api/v1/user
router.post('/new', upload, registerUser);

// route - /api/v1/user/all
router.get('/all',adminOnly, getallUser);

// route - /api/v1/user/:id
router.get('/:id', getUser);

// route - /api/v1/user/:id
router.delete('/:id', adminOnly, deleteUser);

export default router;