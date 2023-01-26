import User from '../models/userModel'

const loginUser = async(req, res) => {
    res.json({mssg: 'login user'});
}

const registerUser = async(req, res) => {
    res.json({mssg: 'register user'});
}

module.exports = { registerUser, loginUser }
