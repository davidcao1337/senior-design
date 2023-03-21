import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu";

const Notifications = () => {
    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="notifications-container card bg-base-100">
                        <div className="card-body">
                            <h1>Notifications</h1>
                            <p className="text-[#748AA1]">Notifications are not supported at this time.</p>
                        </div>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Notifications;