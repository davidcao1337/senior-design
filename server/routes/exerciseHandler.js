import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createExercise, getAllExercise, getExercise, deleteExercise, updateExercise } from "../controllers/exerciseController.js";

const router = express.Router();
router.use(requireAuth);

router.get('/', getAllExercise);

router.get('/:id', getExercise);

router.post('/', createExercise);

router.delete('/:id', deleteExercise);

router.patch('/:id', updateExercise);

export default router