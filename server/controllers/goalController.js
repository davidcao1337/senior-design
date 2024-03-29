import mongoose from "mongoose"
import Goal from "../models/goalModel.js"

const getGoals = async(req, res) => {
    const user_id = req.user._id

    const goals = await Goal.find({ user_id }).sort({createdAt: 1})

    res.status(200).json(goals)
}

const getGoal = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Goal not found'})
    }

    const goal = await Goal.findById(id)

    if (!goal) {
        return res.status(404).json({error: 'Goal not found'})
    }

    res.status(200).json(goal)
}

const createGoal = async(req, res) => {
    const {goalType, description, user_id} = req.body

    try {
        const goal = await Goal.create({goalType, description, user_id})
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteGoal = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Goal not found'})
    }

    const goal = await Goal.findOneAndDelete({_id: id})

    if (!goal) {
        return res.status(404).json({error: 'Goal not found'})
    }

    res.status(200).json(goal)
}

export { getGoals, getGoal, createGoal, deleteGoal }