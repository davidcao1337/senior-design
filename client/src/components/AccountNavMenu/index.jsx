import React from "react"
import { Link } from "react-router-dom";
import "./accountNavMenu.css"

const AccountNavMenu = () => {

    const [isActive, setIsActive] = useState();

    const onClickNavItem = () => {
        
    }

    return(
        <div className="account-menu-nav flex">
            <ul className="menu bg-base-100 w-56 text-[#748AA1] rounded-md float-left">
               <Link to="/account/profile"><li><a className="active: bg-lyfeon-green text-white">Profile</a></li></Link> 
                <Link to="/account/settings"><li><a>Account Settings</a></li></Link>
                <Link to="/account/privacy"><li><a>Privacy</a></li></Link>
                <Link to="/account/notifications"><li><a>Notifications</a></li></Link>
                <Link to="/account/preferences"><li><a>Preferences</a></li></Link>
            </ul>
        </div>
    )
}

export default AccountNavMenu;