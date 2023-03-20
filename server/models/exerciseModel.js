import mongoose from "mongoose";

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    distance:{
        type: Number
    },
    exerciseType:{
        type: String,
        required: true
    },
    loadWeight:{
        type: Number
    },
    sets:{
        type: Number
    },
    reps:{
        type: Number
    },
    calorie:{
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;