import React, { useState, useEffect} from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu"
import ChangeEmailModal from "../../components/Modals/ChangeEmailModal"
import ChangePasswordModal from "../../components/Modals/ChangePasswordModal"

const Settings = () => {
    var user_id = ""
    if (localStorage.getItem('user') != null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [user, setUser] = useState([])
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)

    useEffect( ()=> {
        const fetchUser = async() => {
            const userData = await fetch('/user/' + user_id);
            const user = await userData.json();
            setUser(user)
        }

        fetchUser();
    }, [user_id]);

    // Toggle email modal visibility
    const toggleEmailModal = () => {
        setIsChangeEmailModalOpen(!isChangeEmailModalOpen)
    }

    // Toggle password modal visibility
    const togglePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen)
    }

    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="settings-container card bg-base-100">
                        <div className="card-body flex flex-col space-y-8">
                            <div className="email-container flex flex-row space-x-20">
                                <div>
                                    <label>Email</label>
                                    <p className="text-[#748AA1]">{user.email}</p>
                                </div>
                                <button className="btn btn-outline btn-primary" onClick={toggleEmailModal}>CHANGE</button>
                            </div>
                            <div className="password-container flex flex-row space-x-20">
                                <div>
                                    <label>Password</label>
                                    <p className="text-[#748AA1]">**********</p>
                                </div>
                                <button className="btn btn-outline btn-primary" onClick={togglePasswordModal}>CHANGE</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isChangeEmailModalOpen &&
                    <ChangeEmailModal 
                        isOpen={isChangeEmailModalOpen}
                        toggleModalVisibility={toggleEmailModal}
                        userID={user_id}
                    />
                }
                {isChangePasswordModalOpen &&
                    <ChangePasswordModal 
                        isOpen={isChangePasswordModalOpen}
                        toggleModalVisibility={togglePasswordModal}
                        userID={user_id}
                    />
                }
            </content>
        </section>
    )
}

export default Settings;