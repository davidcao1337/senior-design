import Exercise from "../models/exerciseModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const getAllExercise = async(req, res) => {
    const exercises = await Exercise.find({}).sort({createdAt: -1})

    res.status(200).json(exercises)
}

const getExercise = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findById(id)
    if(!exercise){
        return res.status(404).json({error: 'No such exercise'})
    }

    res.status(200).json(exercise)
}

const createExercise = async(req, res) => {
    const { date, type, time, distance, exerciseType, loadWeight, sets, reps, calorie } = req.body

    try {
        const exercise = await Exercise.create({ date, type, time, distance, exerciseType, loadWeight, sets, reps, calorie })
        res.status(200).json(exercise)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteExercise = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findOneAndDelete({_id: id})
    if(!exercise){
        return res.status(404).json({error: 'No such exercise'})
    }

    res.status(200).json(exercise)
}

const updateExercise = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!exercise){
        return res.status(404).json({error: 'No such exercise'})
    }

    res.status(200).json(exercise)
}

export {createExercise, getAllExercise, getExercise, deleteExercise, updateExercise}