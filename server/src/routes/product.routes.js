import { Router } from "express";
const router = Router();
import { deleteProduct, getAdminProduct, getAllCategories, getLatestProduct, getProductDetails, newProduct, updateProduct } from "../controllers/product.js";
import { upload } from "../middlewares/multer.middleware.js";
import { adminOnly } from "../middlewares/auth.js";


// route - /api/v1/product/new
router.post('/new', adminOnly, upload, newProduct);

// route - /api/v1/product/latest
router.get('/latest', getLatestProduct);

// route - /api/v1/product/categories
router.get('/categories', getAllCategories);

// route - /api/v1/product/admin-products
router.get('/admin-products', adminOnly, getAdminProduct);

// route - /api/v1/product/product-detail
router.get('/:id', getProductDetails);

// route - /api/v1/product/product-update
router.put('/update/:id', adminOnly, upload, updateProduct);

// route - /api/v1/product/product-delete
router.delete('/delete/:id', adminOnly, deleteProduct);


export default router