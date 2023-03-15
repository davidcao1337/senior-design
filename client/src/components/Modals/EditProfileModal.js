import React, { useState } from 'react'
import CalendarComp from '../CalendarComp/index.jsx'
import './GeneralModal.css'

const EditProfileModal = (props) => {

    const { isOpen, toggleModalVisibility, userID } = props

    // Profile Info
    const [name, setName] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)

    const [error, setError] = useState(null)

    const profileUpdates = { name, birthday, height, weight }

    if ( !isOpen ) {
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        // Validate Profile Updates
        // Remove Empty (null) Fields
        for (let key in profileUpdates) {
            if (profileUpdates[key] == null) {
                delete profileUpdates[key]
            }
        }
        // Convert Height string into a Number (if field populated)
        var errorMsg = ''
        if (profileUpdates.hasOwnProperty('height')) {
            const tempHeight = Number(profileUpdates.height)
            if (isNaN(tempHeight)) {
                errorMsg += 'Height must be a number; '
                setError(errorMsg)
            }
            profileUpdates.height = tempHeight
        }
        // Convert Weight string into a Number (if field populated)
        if (profileUpdates.hasOwnProperty('weight')) {
            const tempWeight = Number(profileUpdates.weight)
            if (isNaN(tempWeight)) {
                errorMsg += 'Weight must be a number'
                setError(errorMsg)
            }
            profileUpdates.weight = tempWeight
        }

        const userData = await fetch('/user/' + userID, {
            method: 'PATCH',
            body: JSON.stringify(profileUpdates),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const user = await userData.json()

        if (!user.ok) {
            errorMsg = user.error
            setError(errorMsg)
        }
        if (user.ok) {
            setName('')
            setBirthday(null)
            setHeight(null)
            setWeight(null)
            setError(null)
            console.log('User updated!', user)
        }

        props.toggleModalVisibility()
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
                            <CalendarComp 
                                setBirthday={setBirthday}
                            />
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
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={!error && handleSave}>Save</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default EditProfileModal;