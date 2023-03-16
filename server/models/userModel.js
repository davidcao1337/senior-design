import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }
}, { timestamps: true })

// Static Registration Method
userSchema.statics.register = async function(name, email, password) {

    // Validation
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });

    return user;
}

// Static Login Method
userSchema.statics.login = async function (email, password) {

    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('User account does not exist');
    }

    // Password Comparison
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password')
    }

    return user;
}

const User = mongoose.model('User', userSchema);
export default User;