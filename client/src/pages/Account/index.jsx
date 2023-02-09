import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <div className="account-menu-nav flex">
                        <ul className="menu bg-base-100 w-56 text-[#748AA1] rounded-md float-left">
                            <li><a className="active: bg-lyfeon-green text-white">Profile</a></li>
                            <li><a>Account Settings</a></li>
                            <li><a>Privacy</a></li>
                            <li><a>Notifications</a></li>
                            <li><a>Preferences</a></li>
                        </ul>
                    </div>
                    <div className="profile-goals-container flex flex-col space-y-5 w-full">
                        <div className="profile-container card bg-base-100 h-1/2">
                            <div className="card-body flex flex-row space-x-10">
                                <FontAwesomeIcon className="mt-6" icon={faCircleUser} size="10x"></FontAwesomeIcon>
                                <div className="profile-info flex flex-col">
                                    <p>Name</p>
                                    <p>Age</p>
                                    <p>Height</p>
                                    <p>Weight</p>
                                    <p>BMI</p>
                                    <a className="text-lyfeon-green underline">Edit Profile</a>
                                </div>
                            </div>
                        </div>
                        <div className="goals-container card bg-base-100 h-1/2">
                            <div className="card-body">
                                <h2 className="card-title mb-2">Goals</h2>
                                <div className="goal-cards flex flex-row space-x-8">
                                    <div className="card border border-gray-300">
                                        <div className="card-body">
                                            <div>
                                                <h2>Card</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border border-gray-300">
                                        <div className="card-body">
                                            <div>
                                                <h2>Card</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border border-gray-300">
                                        <div className="card-body">
                                            <div>
                                                <h2>Card</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border border-gray-300">
                                        <div className="card-body">
                                            <div>
                                                <h2>Card</h2>
                                            </div>
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

export default Account;