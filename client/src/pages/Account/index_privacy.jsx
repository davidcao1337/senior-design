import React from "react"
import './account.css'
import NavBar from '../../components/NavBar'
import AccountNavMenu from "../../components/AccountNavMenu";

const Privacy = () => {
    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">My Account</h1>
                <div className="flex flex-row space-x-12 h-full pb-6">
                    <AccountNavMenu />
                    <div className="privacy-container card bg-base-100">
                        <div className="card-body">
                            <h1>Privacy</h1>
                            <p className="text-[#748AA1]">Your data is not shared with any third-parties.</p>
                        </div>
                    </div>
                </div>
            </content>
        </section>
    )
}

export default Privacy;