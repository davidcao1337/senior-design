import React from "react"
import { NavLink } from "react-router-dom";
import "./accountNavMenu.css"

const AccountNavMenu = () => {
    const activeLink = "active: bg-lyfeon-green text-white"
    const normalLink = ""

    return(
        <div className="account-menu-nav flex">
            <ul className="menu bg-base-100 w-56 text-[#748AA1] rounded-md float-left">
                <NavLink to="/account/profile" className={({ isActive }) => (isActive ? activeLink + " rounded-t-md" : normalLink)}><li><a>Profile</a></li></NavLink> 
                <NavLink to="/account/settings" className={({ isActive }) => (isActive ? activeLink : normalLink)}><li><a>Account Settings</a></li></NavLink>
                <NavLink to="/account/privacy" className={({ isActive }) => (isActive ? activeLink : normalLink)}><li><a>Privacy</a></li></NavLink>
                <NavLink to="/account/notifications" className={({ isActive }) => (isActive ? activeLink : normalLink)}><li><a>Notifications</a></li></NavLink>
                <NavLink to="/account/preferences" className={({ isActive }) => (isActive ? activeLink : normalLink)}><li><a>Preferences</a></li></NavLink>
            </ul>
        </div>
    )
}

export default AccountNavMenu;