import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    }
}, { timestamps: true })

// Static Registration Method
userSchema.statics.register = async function(name, email, password) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });

    return user;
}

const User = mongoose.model('User', userSchema);
export default User;