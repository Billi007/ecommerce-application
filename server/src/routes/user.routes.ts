import { Router } from "express";
const router = Router();
import { getallUser, registerUser,getUser, deleteUser } from "../controllers/user.controllers";

// route - /api/v1/user
router.post('/new', registerUser);

// route - /api/v1/user/all
router.get('/all', getallUser);

// route - /api/v1/user/:id
router.get('/:id', getUser);

// route - /api/v1/user/:id
router.delete('/:id', deleteUser);

export default router;