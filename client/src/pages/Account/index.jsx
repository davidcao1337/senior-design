import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'

const Account = () => {
    return (
        <section>
            <NavBar />
            <content>
                <div>
                    <h1 className="Title">My Account</h1>
                    <div className="my-account-nav">
                        <ul className="menu bg-base-100 w-56 text-[#748AA1] rounded-md active:after:">
                            <li><a className="active: bg-lyfeon-green text-white">Profile</a></li>
                            <li><a>Account Settings</a></li>
                            <li><a>Privacy</a></li>
                        </ul>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Account;