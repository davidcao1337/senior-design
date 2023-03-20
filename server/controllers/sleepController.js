import Sleep from "../models/sleepModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const getAllSleep = async(req, res) => {
    const user_id = req.user._id

    const sleeps = await Sleep.find({user_id}).sort({createdAt: -1})

    res.status(200).json(sleeps)
}

const getSleep = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such sleep'})
    }

    const sleep = await Sleep.findById(id)
    if(!sleep){
        return res.status(404).json({error: 'No such sleep'})
    }

    res.status(200).json(sleep)
}

const createSleep = async(req, res) => {
    const {date, hours, minutes} = req.body

    let emptyFields = []
    
    if(!hours){
        emptyFields.push('Hours')
    }
    if(!minutes){
        emptyFields.push('Minutes')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields })
    }

    try {
        const user_id = req.user._id
        const sleep = await Sleep.create({date, hours, minutes, user_id})
        res.status(200).json(sleep)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteSleep = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such sleep'})
    }

    const sleep = await Sleep.findOneAndDelete({_id: id})
    if(!sleep){
        return res.status(404).json({error: 'No such sleep'})
    }

    res.status(200).json(sleep)
}

const updateSleep = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such sleep'})
    }

    const sleep = await Sleep.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!sleep){
        return res.status(404).json({error: 'No such sleep'})
    }

    res.status(200).json(sleep)
}

export { getAllSleep, getSleep, createSleep, deleteSleep, updateSleep }