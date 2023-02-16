import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEllipsisVertical, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="profile-goals-container flex flex-row space-x-8">
                        <div className="profile-container card bg-base-100">
                            <div className="card-body flex flex-col">
                                <FontAwesomeIcon className="m-6" icon={faCircleUser} size="10x"></FontAwesomeIcon>
                                <div className="full-name mb-5 flex flex-row justify-center">
                                    <h1>Jane Doe</h1>
                                </div>
                                <div className="profile-info mt-5 flex flex-row space-x-10 justify-center">
                                    <div className="profile-labels flex flex-col space-y-3">
                                        <p>Age</p>
                                        <p>Height</p>
                                        <p>Weight</p>
                                        <p>BMI</p>
                                    </div>
                                    <div className="profile-values text-[#748AA1] flex flex-col space-y-3">
                                        <p>22</p>
                                        <p>5'5</p>
                                        <p>128</p>
                                        <p>68</p>
                                    </div>
                                </div>
                                <button className="mt-20 p-2 text-lg text-white bg-lyfeon-green rounded-[6px]">Edit Profile</button>
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
            </content>
        </section>
    )
}

export default Profile;