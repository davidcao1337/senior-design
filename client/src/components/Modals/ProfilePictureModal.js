import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import './GeneralModal.css'

const ProfilePictureModal = (props) => {

    const { isOpen, toggleModalVisibility, user_id } = props

    const [src, setSrc] = useState(null)
    // Avatar is set as a Base64 encoded string by onCrop function
    const [avatar, setAvatar] = useState(null)
    const profileAvatarUpdate = { avatar }

    const [error, setError] = useState(null)

    const onClose = () => {
        setAvatar(null)
    }
    const onCrop = (view) => {
        setAvatar(view)
    }

    if ( !isOpen ) {
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        const userData = await fetch('/user/' + user_id, {
            method: 'PATCH',
            body: JSON.stringify(profileAvatarUpdate),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const userDataJson = await userData.json()

        if (!userData.ok) {
            setError(userDataJson.error)
        }
        if (userData.ok) {
            setSrc(null)
            setAvatar(null)
            setError(null)
            
            props.toggleModalVisibility()
        }
    }
    

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Edit Profile Picture</h2>
                    <div className="picture-editor-container">
                        <Avatar
                            width={400}
                            height={300}
                            onCrop={onCrop}
                            onClose={onClose}
                            src={src}
                        />
                    </div>
                    <div className="buttons-container flex flex-row justify-center">
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSave}>Save</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default ProfilePictureModal