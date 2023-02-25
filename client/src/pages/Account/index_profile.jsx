import React, { useState, useEffect} from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu"
import EditProfileModal from "../../components/Modals/EditProfileModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEllipsisVertical, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';

const user_id = String(JSON.parse(localStorage.getItem('user')).user_id);

const Profile = () => {
    const [user, setUser] = useState([]);
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)

    const fetchUser = async() => {
        const userData = await fetch('/user/' + user_id);
        const user = await userData.json();
        setUser(user);
    }

    // Toggle modal without saving
    const toggleProfileModal = () => {
        setIsUserProfileModalOpen(!isUserProfileModalOpen)
    }

    // Save changes made in modal and toggle
    const saveToggleProfileModal = () => {
        // TODO: Save changes and update user's info in DB
        console.log("Saved!")
        
        setIsUserProfileModalOpen(!isUserProfileModalOpen)
    }

    useEffect( ()=> {
        fetchUser();
    }, []);

    // Fetched Values
    const userName = user.name || "N/A"
    const userHeight = user.height || "N/A"
    const userWeight = user.weight || "N/A"

    // Calculated Values
    var age = "N/A"
    var bmi = "N/A"

    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="profile-goals-container flex flex-row space-x-8">
                        <div className="profile-container card bg-base-100">
                            <div className="card-body flex flex-col">
                                <FontAwesomeIcon className="m-6" icon={faCircleUser} size="10x"></FontAwesomeIcon>
                                <div className="full-name mb-5 flex flex-row justify-center">
                                    <h1>{userName}</h1>
                                </div>
                                <div className="profile-info mt-5 flex flex-row space-x-10 justify-center">
                                    <div className="profile-labels flex flex-col space-y-3">
                                        <p>Age</p>
                                        <p>Height</p>
                                        <p>Weight</p>
                                        <p>BMI</p>
                                    </div>
                                    <div className="profile-values text-[#748AA1] flex flex-col space-y-3">
                                        <p>{age}</p>
                                        <p>{userHeight}</p>
                                        <p>{userWeight}</p>
                                        <p>{bmi}</p>
                                    </div>
                                </div>
                                <button className="mt-20 p-2 text-lg text-white bg-lyfeon-green rounded-[6px]" onClick={toggleProfileModal}>Edit Profile</button>
                            </div>
                        </div>
                        <div className="goals-container card bg-base-100">
                            <div className="card-body">
                                <div className="card-title mb-2 flex flex-row justify-center">
                                    <h2>Goals</h2>
                                </div>
                                <div className="goal-cards flex flex-col space-y-8">
                                    <div className="card border border-gray-300">
                                        <div className="card-body">
                                            <div className="flex flex-row">
                                                <FontAwesomeIcon className="mr-5" icon={faTrophy} size="2x" />
                                                <p>Goal Text</p>
                                                <div className="ml-20 mr-20" />
                                                <button className="ml-20"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border border-gray-300 border-dashed">
                                        <div className="card-body">
                                            <button>
                                                <span className="flex flex-row">
                                                    <FontAwesomeIcon icon={faPlus} size="2x" />
                                                    <p className="text-[#748AA1]">Add Goal</p>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isUserProfileModalOpen &&
                    <EditProfileModal isOpen={isUserProfileModalOpen} handleCancelClick={toggleProfileModal} handleSaveClick={saveToggleProfileModal} />
                }
            </content>
        </section>
    )
}

export default Profile;