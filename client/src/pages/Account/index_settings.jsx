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
                <h1 className="Title">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div>
                        <h1>Settings</h1>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Settings;