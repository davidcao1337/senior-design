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
                </div>
            </content>
        </section>
    )
}

export default Account;