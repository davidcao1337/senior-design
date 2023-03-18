import React, { useState } from 'react'
import './GeneralModal.css'

const ChangePasswordModal = (props) => {

    const { isOpen, toggleModalVisibility, userID } = props

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)

    const [error, setError] = useState(null)

    const passwordUpdate = { currentPassword, newPassword }

    if ( !isOpen ) {
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        // New Password Comparison (with confirm)
        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match')
            return
        }

        // Update User's Password
        const userData = await fetch('/user/' + userID, {
            method: 'PATCH',
            body: JSON.stringify(passwordUpdate),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const userDataJson = await userData.json()

        if (!userData.ok) {
            setError(userDataJson.error)
        }
        if (userData.ok) {
            setCurrentPassword(null)
            setNewPassword(null)
            setConfirmNewPassword(null)
            setError(null)

            props.toggleModalVisibility()
        }
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Change Password</h2>
                    <div className="form-container">
                        <form className="flex flex-col">
                            <label className="font-semibold">Current Password</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" id="currentPassword" name="currentPassword" autoComplete="off"/>
                            <label className="font-semibold">New Password</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" id="newPassword" name="newPassword" autoComplete="off"/>
                            <label className="font-semibold">Confirm New Password</label>
                            <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" id="confirmNewPassword" name="confirmNewPassword" autoComplete="off"/>
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

export default ChangePasswordModal