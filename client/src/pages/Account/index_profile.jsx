import React, { useState, useEffect} from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu"
import EditProfileModal from "../../components/Modals/EditProfileModal"
import ProfilePictureModal from "../../components/Modals/ProfilePictureModal"
import GoalJournal from "../../components/GoalJournal"
import GoalModal from "../../components/Modals/GoalModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    var user_id = ""
    if (localStorage.getItem('user') != null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [user, setUser] = useState([])
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
    const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)

    useEffect( ()=> {
        const fetchUser = async() => {
            const userData = await fetch('/user/' + user_id);
            const user = await userData.json();
            setUser(user)
        }

        fetchUser();
    }, [user_id]);

    // Toggle profile modal visibility
    const toggleProfileModal = () => {
        setIsUserProfileModalOpen(!isUserProfileModalOpen)
    }

    // Toggle profile picture modal visibility
    const toggleProfilePictureModal = () => {
        setIsProfilePictureModalOpen(!isProfilePictureModalOpen)
    }

    // Toggle goal modal visibility
    const toggleGoalModal = () => {
        setIsGoalModalOpen(!isGoalModalOpen)
    }

    // Fetched Values
    const userName = user.name || "N/A"
    const userHeight = user.height || "N/A"
    const userWeight = user.weight || "N/A"
    const userBirthday = user.birthday || null

    // Calculated Values
    // Age
    var ageCalc = null
    if (userBirthday != null) {
        const currentDate = new Date()
        const userBirthdate = new Date(userBirthday)
        const dateDifference = (currentDate - userBirthdate) / (1000 * 60 * 60 * 24 * 365.25)
        ageCalc = Math.floor(dateDifference)
    }
    var age = ageCalc || "N/A"

    // BMI
    var bmiCalc = null
    if (!isNaN(userHeight) && !isNaN(userWeight)) {
        bmiCalc = (userWeight / Math.pow((userHeight/100), 2)).toPrecision(3)
    }
    var bmi = bmiCalc || "N/A"

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
                                <button onClick={toggleProfilePictureModal}>
                                    <FontAwesomeIcon className="m-6" icon={faCircleUser} size="10x" />
                                </button>
                                <div className="full-name mb-5 flex flex-row justify-center">
                                    <h1>{userName}</h1>
                                </div>
                                <div className="profile-info mt-5 flex flex-row space-x-10 justify-center">
                                    <div className="profile-labels flex flex-col space-y-3">
                                        <p>Age</p>
                                        <p>Height (cm)</p>
                                        <p>Weight (kg)</p>
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
                        <GoalJournal
                            toggleModalVisibility={toggleGoalModal}
                        />
                    </div>
                </div>
                {isUserProfileModalOpen &&
                    <EditProfileModal 
                        isOpen={isUserProfileModalOpen}
                        toggleModalVisibility={toggleProfileModal}
                        userID={user_id}
                    />
                }
                {isProfilePictureModalOpen &&
                    <ProfilePictureModal 
                        isOpen={isProfilePictureModalOpen}
                        toggleModalVisibility={toggleProfilePictureModal}
                        user_id={user_id}
                    />
                }
                {isGoalModalOpen &&
                    <GoalModal
                        isOpen={isGoalModalOpen}
                        toggleModalVisibility={toggleGoalModal}
                        user_id={user_id}
                    />
                }
            </content>
        </section>
    )
}

export default Profile;