import express from "express";
const router = express.Router();

import { registerUser, loginUser, getUser, updateUser } from "../controllers/userController.js";

// Login User
router.post('/login', loginUser);

// Register User
router.post('/register', registerUser);

// GET User
router.get('/:id', getUser)

// UPDATE User
router.patch('/:id', updateUser)

export default router