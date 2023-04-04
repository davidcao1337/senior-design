import Exercise from "../models/exerciseModel.js"
import mongoose from "mongoose"

const getExerciseCollection = async(req, res) => {
    const exercises = await Exercise.find()

    res.status(200).json(exercises)
}

const getAllExercise = async(req, res) => {
    const user_id = req.user._id

    const exercises = await Exercise.find({ user_id }).sort({createdAt: -1})

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

    let emptyFields = []
    
    if(!type){
        emptyFields.push('Type')
    }
    if(!time){
        emptyFields.push('Time')
    }
    if(!exerciseType){
        emptyFields.push('ExerciseType')
    }
    if(!calorie){
        emptyFields.push('Calories')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields })
    }

    try {
        const user_id = req.user._id
        const exercise = await Exercise.create({ date, type, time, distance, exerciseType, loadWeight, sets, reps, calorie, user_id })
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

export {createExercise, getExerciseCollection, getAllExercise, getExercise, deleteExercise, updateExercise}