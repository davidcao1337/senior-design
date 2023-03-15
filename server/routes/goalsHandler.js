import express from "express";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();
router.use(requireAuth);

import { getGoals, getGoal, createGoal, deleteGoal } from "../controllers/goalController.js";

// GET All goals
router.get('/' , getGoals);

// GET a single goal
router.get('/:id' , getGoal);

// POST a new goal
router.post("/", createGoal);

// DELETE a goal
router.delete("/:id", deleteGoal);

export default router