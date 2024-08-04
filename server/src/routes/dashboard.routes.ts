import { Router } from "express";
import { getBarChart, getDashboard, getLineChart, getPieChart } from "../controllers/dashboard.controllers.js";
import adminOnly from "../middleware/auth.js";
const router = Router();

//api/v1/dashboard/stats
router.get('/stats', adminOnly, getDashboard);

//api/v1/dashboard/pie
router.get('/pie', adminOnly, getPieChart);

//api/v1/dashboard/bar
router.get('/bar', adminOnly, getBarChart);

//api/v1/dashboard/line
router.get('/line', adminOnly, getLineChart);

export default router;