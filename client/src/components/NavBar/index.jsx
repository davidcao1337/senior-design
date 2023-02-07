import React, { useState } from "react"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './navBar.css';
import { useLogout } from "../../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils, faMoon, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const { logout } = useLogout();

    const handleClick = () => {
      logout();
    }

    return (
        <>
          <div className="navContainer">
                  
                  <div className="sidebar">
                  <Link to='/profile'><p><span>Profile</span></p></Link>
                    <ul className="navItems">
                    <Link to='/dashboard'><li><span><FontAwesomeIcon icon={faChartSimple} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    <Link to='/exercise'><li><span><FontAwesomeIcon icon={faDumbbell} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    <Link to='/diet'><li><span><FontAwesomeIcon icon={faUtensils} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    <Link to='/sleep'><li><span><FontAwesomeIcon icon={faMoon} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    </ul>
                    <div className="logout">
                      <button onClick={handleClick}>Logout</button> {/* TEMP; Change location later */}
                    </div>
                  </div>
                  
                  <div className="content">
                     
                  </div>
          </div>
        </>
    );
}

export default NavBar;