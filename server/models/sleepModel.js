import mongoose from "mongoose";

const Schema = mongoose.Schema

const sleepSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    hours:{
        type: Number,
        required: true
    },
    minutes:{
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Sleep = mongoose.model('Sleep', sleepSchema);
export default Sleep;