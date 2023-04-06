import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createFood, getFoods } from "../controllers/foodsController.js";
const router = express.Router();
router.use(requireAuth);

// post a new food item
router.post('/', createFood)

// GET all food items
router.get('/', getFoods)

export default router
