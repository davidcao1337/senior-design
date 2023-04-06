import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createFoodItem, getFoodItem, getFoodItems, deleteFoodItem, updateFoodItem, getFoodItemCollection } from "../controllers/foodItemController.js";
const router = express.Router();
router.use(requireAuth);

// post a new food item
router.post('/', createFoodItem)

// GET a single food item
router.get('/:id', getFoodItem)

// GET all food items
router.get('/', getFoodItems)

// All food items
router.get('/rec', getFoodItemCollection);

// Delete a food item
router.delete('/:id', deleteFoodItem)

// Delete a food item
router.patch('/:id', updateFoodItem)

export default router
