import React, { useState, useEffect} from "react"
import { Link, NavLink } from "react-router-dom";
import './navBar.css';
import { useLogout } from "../../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils, faMoon, faChartSimple, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DefaultAvatar from "../../assets/circle-user-solid.svg"

const NavBar = () => {
    const activeLink = "active: bg-lyfeon-green text-white"
    const normalLink = ""

    var user_id = ""
    if (localStorage.getItem('user') != null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [user, setUser] = useState([])

    useEffect( ()=> {
      const fetchUser = async() => {
          const userData = await fetch('/user/' + user_id);
          const user = await userData.json();
          setUser(user)
      }

      fetchUser();
  }, [user_id]);

    const userAvatar = user.avatar || DefaultAvatar

    const { logout } = useLogout();

    const handleClick = () => {
      logout();
    }

    return (
        <>
          <div className="navContainer">
                  <div className="sidebar">
                    <div className="mt-5 flex items-center justify-center">
                      <Link to='/account/profile'><img src={userAvatar} height="40" width="40" /></Link>
                    </div>
                    <ul className="menu mt-28 bg-base-100 w-full text-[#748AA1] rounded-md float-left">
                      <NavLink to='/dashboard' className={({ isActive }) => (isActive ? activeLink + " rounded-tr-md rounded-br-md" : normalLink)}><li><span><FontAwesomeIcon icon={faChartSimple} size="2x" className="navIcon ml-2"></FontAwesomeIcon></span></li></NavLink>
                      <NavLink to='/exercise' className={({ isActive }) => (isActive ? activeLink + " rounded-tr-md rounded-br-md" : normalLink)}><li><span><FontAwesomeIcon icon={faDumbbell} size="2x" className="navIcon ml-1"></FontAwesomeIcon></span></li></NavLink>
                      <NavLink to='/nutrition' className={({ isActive }) => (isActive ? activeLink + " rounded-tr-md rounded-br-md" : normalLink)}><li><span><FontAwesomeIcon icon={faUtensils} size="2x" className="navIcon ml-2"></FontAwesomeIcon></span></li></NavLink>
                      <NavLink to='/sleep' className={({ isActive }) => (isActive ? activeLink + " rounded-tr-md rounded-br-md" : normalLink)}><li><span><FontAwesomeIcon icon={faMoon} size="2x" className="navIcon ml-2"></FontAwesomeIcon></span></li></NavLink>
                    </ul>
                    <div className="logout ml-2">
                      <button onClick={handleClick}><FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" color="#748AA1" /></button> {/* TEMP; Change location later */}
                    </div>
                  </div>
                  
                  <div className="content">
                     
                  </div>
          </div>
        </>
    );
}

export default NavBar;