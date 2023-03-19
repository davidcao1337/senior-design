import React, { useState } from 'react'
import './GeneralModal.css'

const ChangeEmailModal = (props) => {
    
    const { isOpen, toggleModalVisibility, userID } = props

    const [newEmail, setNewEmail] = useState(null)
    const [confirmNewEmail, setConfirmNewEmail] = useState(null)

    const [error, setError] = useState(null)

    var email = null
    const emailUpdate = { email }

    if ( !isOpen ) {
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        // New Email Comparison (with confirm)
        if (newEmail !== confirmNewEmail) {
            setError('Emails do not match')
            return
        }

        // Update User's Email
        emailUpdate.email = newEmail
        const userData = await fetch('/user/' + userID, {
            method: 'PATCH',
            body: JSON.stringify(emailUpdate),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const userDataJson = await userData.json()

        if (!userData.ok) {
            setError(userDataJson.error)
        }
        if (userData.ok) {
            setNewEmail(null)
            setConfirmNewEmail(null)
            setError(null)

            props.toggleModalVisibility()
        }
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Change Email</h2>
                    <div className="form-container">
                        <form className="flex flex-col">
                            <label className="font-semibold">New Email</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" id="newEmail" name="newEmail" autoComplete="off"/>
                            <label className="font-semibold">Confirm New Email</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)} type="email" id="confirmNewEmail" name="confirmNewEmail" autoComplete="off"/>
                        </form>
                    </div>
                    <div className="buttons-container flex flex-row justify-center">
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSave}>Save</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            </div>
        </div>
    )
}

export default ChangeEmailModal