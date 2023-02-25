import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = () => {
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
                                    <p className="text-[#748AA1]">johndoe@myemailaddress.com</p>
                                </div>
                                <button className="btn btn-outline btn-primary">CHANGE</button>
                            </div>
                            <div className="password-container flex flex-row space-x-20">
                                <div>
                                    <label>Password</label>
                                    <p className="text-[#748AA1]">**********</p>
                                </div>
                                <button className="btn btn-outline btn-primary">CHANGE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Settings;