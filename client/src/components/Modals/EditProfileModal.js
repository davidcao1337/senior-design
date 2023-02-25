import React, { useState } from 'react'
import CalendarComp from '../CalendarComp/index.jsx'
import './EditProfileModal.css'

const EditProfileModal = (props) => {
    const [name, setName] = useState('');
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)

    const { isOpen, handleCancelClick, handleSaveClick } = props

    if ( !isOpen ) {
        return null
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Edit Profile</h2>
                    <div className="form-container">
                        <form className="flex flex-col">
                            <label className="font-semibold">Full Name</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" autoComplete="off"/>
                            <label className="font-semibold">Date of Birth</label>
                            <CalendarComp />
                            <div className='height-weight-container flex flex-row'>
                                <div className='height-container flex flex-col'>
                                    <label className="font-semibold">Height (cm)</label>
                                    <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={height} onChange={(e) => setHeight(e.target.value)} id="height" name="height" />
                                </div>
                                <div className="ml-2 mr-2"></div>
                                <div className="weight-container flex flex-col">
                                    <label className="font-semibold">Weight (kg)</label>
                                    <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={weight} onChange={(e) => setWeight(e.target.value)} id="weight" name="weight" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="buttons-container flex flex-row justify-center">
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSaveClick}>Save</button>
                        <button className="ml-10 btn" onClick={handleCancelClick}>Cancel</button>
                    </div>
            </div>
        </div>
    )
}

export default EditProfileModal;