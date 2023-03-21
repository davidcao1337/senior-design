import FoodItem from '../models/foodItemModel.js';
import mongoose from "mongoose"

// get all food items
const getFoodItems = async( req, res) => {
    const user_id = req.user._id
    const foodItems = await FoodItem.find({ user_id }).sort({createdAt: -1})
    
    res.status(200).json(foodItems)
}

// get a single food item
const getFoodItem = async( req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid( id )){
        return res.status( 404 ).json({ error: 'No such food item' })
    }

    const foodItem = await FoodItem.findById( id )

    if ( !foodItem ) {
        return res.status( 404 ).json({ error: 'No such food item' })
    }
    res.status( 200 ).json( foodItem )
}

// create a food item
const createFoodItem = async( req, res) => {
    const {
        mealCategory, 
        dateEaten, 
        itemName, 
        caloriesPerServing, 
        fatPerServing, 
        proteinPerServing,
        carbsPerServing,
        servingsEaten} = req.body
        
        // add doc to db
        try {
            const user_id = req.user._id
            const foodItem = await FoodItem.create({
                mealCategory, 
                dateEaten, 
                itemName, 
                caloriesPerServing, 
                fatPerServing, 
                proteinPerServing,
                carbsPerServing,
                servingsEaten,
                user_id
            })
            res.status(200).json(foodItem)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

// delete a food item
const deleteFoodItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid( id )){
        return res.status( 404 ).json({ error: 'No such food item' })
    }

    const foodItem = await FoodItem.findOneAndDelete({ _id: id })

    if ( !foodItem ) {
        return res.status( 400 ).json({ error: 'No such food item' })
    }

    res.status( 200 ).json( foodItem )
}

// update a food item
const updateFoodItem = async ( req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid( id )){
        return res.status( 404 ).json({ error: 'No such food item' })
    }

    const foodItem = await FoodItem.findOneAndReplace({ _id: id }, {
        ...req.body
    })

    if ( !foodItem ) {
        return res.status( 400 ).json({ error: 'No such food item' })
    }

    res.status( 200 ).json( foodItem )
}

// exports
export {
    createFoodItem,
    getFoodItems,
    getFoodItem,
    deleteFoodItem,
    updateFoodItem
}