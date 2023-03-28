import React, { useState, useEffect} from "react"
import { Link, NavLink } from "react-router-dom";
import './navBar.css';
import { useLogout } from "../../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils, faMoon, faChartSimple, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DefaultAvatar from "../../assets/circle-user-solid.svg"

const NavBar = () => {
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
                    <ul className="navItems">
                      <Link to='/dashboard'><li><span><FontAwesomeIcon icon={faChartSimple} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/exercise'><li><span><FontAwesomeIcon icon={faDumbbell} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/nutrition'><li><span><FontAwesomeIcon icon={faUtensils} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                      <Link to='/sleep'><li><span><FontAwesomeIcon icon={faMoon} size="2x" className="navIcon"></FontAwesomeIcon></span></li></Link>
                    </ul>
                    <div className="logout ml-2">
                      <button onClick={handleClick}><FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" color="#B8C5D3" /></button> {/* TEMP; Change location later */}
                    </div>
                  </div>
                  
                  <div className="content">
                     
                  </div>
          </div>
        </>
    );
}

export default NavBar;