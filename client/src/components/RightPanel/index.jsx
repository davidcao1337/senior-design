import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png'
import DefaultAvatar from "../../assets/circle-user-solid.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faMoon, faUtensils } from '@fortawesome/free-solid-svg-icons';

const RightPanel = () => {
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

    // Fetched Values
    const userName = user.name || "N/A"
    const userHeight = user.height || "N/A"
    const userWeight = user.weight || "N/A"
    const userBirthday = user.birthday || null
    const userAvatar = user.avatar || DefaultAvatar

    // Calculated Values
    // Age
    var ageCalc = null
    if (userBirthday != null) {
        const currentDate = new Date()
        const userBirthdate = new Date(userBirthday)
        const dateDifference = (currentDate - userBirthdate) / (1000 * 60 * 60 * 24 * 365.25)
        ageCalc = Math.floor(dateDifference)
    }
    var age = ageCalc || "N/A"

    return (
        <div className="right-panel">
        <div className='userCardContainer'>
            <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
            <div className='userCardTypeA flex flex-row space-x-5'>
                <img src={userAvatar} width="120" height="120" />
                <div className='profile-info flex flex-col text-left font-light'>
                    <p className='!font-medium !text-2xl mb-2'>{userName}</p>
                    <p>Age: {age}</p>
                    <p>Height: {userHeight} cm</p>
                    <p>Weight: {userWeight} kg</p>
                </div>
            </div>
        </div>
        <div className='calendar'>
            <div className="calendar-container">
                <Calendar />
            </div>
            <div className='recTitle'>
                <div className='p-5'>
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Recommended Goals</h5>
                        <p class="font-normal text-center text-gray-700 dark:text-gray-400">
                            <div className="exerciseGoalRec flex flex-row space-x-8">
                                <FontAwesomeIcon icon={faDumbbell} className='text-[#e11d48] mt-1' />
                                <p>Run 30 mins daily</p>
                            </div>
                            <br />
                            <div className="nutritionGoalRec flex flex-row space-x-3">
                                <FontAwesomeIcon icon={faUtensils} className='text-[#0284c7] mt-1' />
                                <p>Daily protein consumption: 56 g</p>
                            </div>
                            <br />
                            <div className="sleepGoalRec flex flex-row space-x-3">
                                <FontAwesomeIcon icon={faMoon} className='text-[#7c3aed] mt-1' />
                                <p>Get 8 hours of sleep every night</p>
                            </div>
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default RightPanel;
