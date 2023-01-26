import User from '../models/userModel.js'

const loginUser = async(req, res) => {
    res.json({mssg: 'login user'});
}

const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.register(name, email, password);
        res.status(200).json({email, user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export { registerUser, loginUser }
