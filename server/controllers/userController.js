import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30d' });
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

export { registerUser, loginUser, getUser, updateUser }
