import React, { useState } from "react"
import { Link } from "react-router-dom";
import './navBar.css';
import testDumbbell from '../../assets/testdumbbell.png';
import dashboard from '../../assets/dashboard.png';
import diet from '../../assets/diet.png';
import sleep from '../../assets/sleep.png';

const NavBar = () => {
    return (
        <navContainer>
            <navItems>
                <ul> <Link to='/dashboard'><img src={dashboard} alt="" width="100%" height="50px" /></Link> </ul>
                <ul> <Link to='/exercise'><img src={testDumbbell} alt="" width="100%" height="50px" /></Link> </ul>
                <ul> <Link to='/diet'><img src={diet} alt="" width="100%" height="50px" /></Link> </ul>
                <ul> <Link to='/sleep'><img src={sleep} alt="" width="100%" height="50px" /></Link> </ul>
            </navItems>
        </navContainer>
    )
}

export default NavBar;