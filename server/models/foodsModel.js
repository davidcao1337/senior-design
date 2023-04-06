import mongoose from "mongoose";

const Schema = mongoose.Schema;

// This schema will be the general database for all foods logged by users ever
// Need item name & macros
const foodsSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    caloriesPerServing: {
        type: Number,
        required: true
    },
    fatPerServing: {
        type: Number,
        required: true
    },
    proteinPerServing: {
        type: Number,
        required: true
    },
    carbsPerServing: {
        type: Number,
        required: true
    }
}, { timestamps: false })

const Foods = mongoose.model('Foods', foodsSchema);
export default Foods;
