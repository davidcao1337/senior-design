import express from "express";
const router = express.Router()

import { createExercise, getAllExercise, getExercise, deleteExercise, updateExercise } from "../controllers/exerciseController.js";

router.get('/', getAllExercise);

router.get('/:id', getExercise);

router.post('/', createExercise);

router.delete('/:id', deleteExercise);

router.patch('/:id', updateExercise);

export default router