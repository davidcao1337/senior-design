import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    goalType: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Goal = mongoose.model('Goal', goalSchema);
export default Goal