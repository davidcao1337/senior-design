import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"

const createToken = (_id) => {
    return jwt.sign({ _id }, 'CHU2TIY324A4355SAFAID5NBAN6DIG524508934A945W9D', { expiresIn: '30d' });
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const user_id = user._id
        const token = createToken(user_id);

        res.status(200).json({user_id, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.register(name, email, password);
        const user_id = user._id
        const token = createToken(user_id);

        res.status(200).json({user_id, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUser = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

const updateUser = async(req, res) => {
    const { id } = req.params
    var updates = req.body

    var user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Doc ID'})
    }

    // Email Update Validation
    if (updates.hasOwnProperty('email')) {
        if (!validator.isEmail(updates.email)) {
            return res.status(400).json({error: 'Email is not valid'})
        }

        const exists = await User.findOne({email: updates.email})
        if (exists) {
            return res.status(400).json({error: 'Email already in use'})
        }
    }

    // Password Update Validation
    if (updates.hasOwnProperty('currentPassword') && updates.hasOwnProperty('newPassword')) {
        // Password Comparison (currentPassword vs Password in DB)
        const match = await bcrypt.compare(updates.currentPassword, user.password)
        if (!match) {
            return res.status(400).json({error: 'Current Password does not match with the current password on record'})
        }

        // Check Password Strength
        if (!validator.isStrongPassword(updates.newPassword)) {
            return res.status(400).json({error: 'Password not strong enough'})
        }

        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(updates.newPassword, salt);

        // Modify updates object to have just the new password (hashed)
        updates = {password: hash}
    }

    user = await User.findOneAndUpdate({_id: id}, {$set: updates})

    if (!user) {
        return res.status(404).json({error: 'User not found; could not update'})
    }

    res.status(200).json(user)
}

export { registerUser, loginUser, getUser, updateUser }
