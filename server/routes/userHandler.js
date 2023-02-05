import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/userController.js";

// Login User
router.post('/login', loginUser);

// Register User
router.post('/register', registerUser);

export default router