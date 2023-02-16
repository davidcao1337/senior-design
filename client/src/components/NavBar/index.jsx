import React from "react"
import { Link } from "react-router-dom";
import './navBar.css';
import { useLogout } from "../../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils, faMoon, faChartSimple, faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const { logout } = useLogout();

    const handleClick = () => {
      logout();
    }

    return (
        <>
          <div className="navContainer">
                  <div className="sidebar">
                    <div className="mt-5 flex items-center justify-center">
                      <Link to='/account/profile'><FontAwesomeIcon icon={faCircleUser} size="2x"></FontAwesomeIcon></Link>
                    </div>
                    <ul className="navItems">
                      <Link to='/dashboard'><li><span><FontAwesomeIcon icon={faChartSimple} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/exercise'><li><span><FontAwesomeIcon icon={faDumbbell} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/nutrition'><li><span><FontAwesomeIcon icon={faUtensils} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/sleep'><li><span><FontAwesomeIcon icon={faMoon} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    </ul>
                    <div className="logout">
                      <button onClick={handleClick}><FontAwesomeIcon icon={faArrowRightFromBracket} size="2x"/></button> {/* TEMP; Change location later */}
                    </div>
                  </div>
                  
                  <div className="content">
                     
                  </div>
          </div>
        </>
    );
}

export default NavBar;