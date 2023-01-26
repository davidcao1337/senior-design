import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30d' });
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.register(name, email, password);
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export { registerUser, loginUser }
