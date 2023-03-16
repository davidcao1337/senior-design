import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import './GeneralModal.css'

const ProfilePictureModal = (props) => {

    const { isOpen, toggleModalVisibility, user_id } = props

    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)

    const [error, setError] = useState(null)

    const onClose = () => {
        setPreview(null)
    }
    const onCrop = (view) => {
        setPreview(view)
    }

    useEffect(() => {
        console.log(preview)
    }, [])

    const handleSave = () => {
        console.log("Saved")
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
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={!error && handleSave}>Save</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default ProfilePictureModal