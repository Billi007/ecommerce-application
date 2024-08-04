import { Router } from "express";
import { 
deleteProduct,
getAdminProduct,
getAllCategories,
getLatestProduct,
getProductDetails,
newProduct, 
searchProduct, 
updateProduct 
} from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.js";
import adminOnly from "../middleware/auth.js";
const router = Router();

//api/v1/product/new
router.post('/new', adminOnly, upload, newProduct);

//api/v1/product/latest
router.get('/latest', getLatestProduct);

//api/v1/product/admin-product
router.get('/admin-product', adminOnly, getAdminProduct);

//api/v1/product/categories
router.get('/categories', getAllCategories);

//api/v1/product/search
router.get('/search', searchProduct);

// route - /api/v1/product/product-detail
router.get('/:id', getProductDetails);

//api/v1/product/update-product/:id
router.put('/update/:id', adminOnly, upload, updateProduct);

//api/v1/product/update-product/:id
router.delete('/delete/:id',adminOnly, deleteProduct);

export default router