import React, { useState } from "react"
import { Link } from "react-router-dom";
import './navBar.css';
import { useLogout } from "../../hooks/useLogout";
// import testDumbbell from '../../assets/testdumbbell.png';
// import dashboard from '../../assets/dashboard.png';
// import diet from '../../assets/diet.png';
// import sleep from '../../assets/sleep.png';

const NavBar = () => {
    const { logout } = useLogout();

    const handleClick = () => {
      logout();
    }

    return (
        <>
          <div className="navContainer">
                  
                  <div className="sidebar">
                    <p>Profile</p>
                    <ul className="navItems">
                      <li><Link to='/dashboard'><span><i className="fa fa-home"></i></span><span>Dashboard</span></Link></li>
                      <li><Link to='/exercise'><span><i className="fa fa-home"></i></span><span>Exercise</span></Link></li>
                      <li><Link to='/diet'><span><i className="fa fa-dashboard"></i></span><span>Diet</span></Link></li>
                      <li><Link to='/sleep'><span><i className="fa fa-users"></i></span><span>Sleep</span></Link></li>
                    </ul>
                    <div>
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