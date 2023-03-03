import express from "express";
const router = express.Router();

import { getGoals, getGoal, createGoal, deleteGoal, updateGoal } from "../controllers/goalController.js";

// GET All goals
router.get('/' , getGoals);

// GET a single goal
router.get('/:id' , getGoal);

// POST a new goal
router.post("/", createGoal);

// DELETE a goal
router.delete("/:id", deleteGoal);

// UPDATE a goal
router.patch(":id", updateGoal);

export default router