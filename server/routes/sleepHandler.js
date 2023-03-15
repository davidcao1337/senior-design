import express from "express";

import { getAllSleep, getSleep, createSleep, deleteSleep, updateSleep } from "../controllers/sleepController.js";
const router = express.Router()

router.get('/', getAllSleep);

router.get('/:id', getSleep);

router.post('/', createSleep);

router.delete('/:id', deleteSleep);

router.patch('/:id', updateSleep);

export default router