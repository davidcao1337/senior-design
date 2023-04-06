import Foods from '../models/foodsModel.js';

// get all food items
const getFoods = async( req, res) => {
    const foods = await Foods.find()
    
    res.status(200).json(foods)
}

// create a food item
const createFood = async( req, res) => {
    const {
        itemName, 
        caloriesPerServing, 
        fatPerServing, 
        proteinPerServing,
        carbsPerServing} = req.body
        
        // add doc to db
        try {
            const food = await Foods.create({
                itemName, 
                caloriesPerServing, 
                fatPerServing, 
                proteinPerServing,
                carbsPerServing
            })
            res.status(200).json(food)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

// exports
export {
    createFood,
    getFoods
}