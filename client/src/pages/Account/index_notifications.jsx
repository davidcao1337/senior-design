import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = () => {
    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="notifications-container card bg-base-100">
                        <div className="card-body">
                            <h1>Notifications</h1>
                        </div>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Notifications;