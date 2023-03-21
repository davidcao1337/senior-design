import mongoose from "mongoose";

const Schema = mongoose.Schema;

// We want to track as much needed information of an item to display to user
// Timestamp of logging not needed
const foodItemSchema = new Schema({
    mealCategory: {
        type: String,
        required: true
    },
    dateEaten: {
        type: Date,
        required: true
    },
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
    },
    servingsEaten: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;
