import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import Popup from 'reactjs-popup';
import AddActivity from '../../pages/Exercise/addActivity';
import lyfeonLogo from '../../assets/lyfeon-green.png';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useExerciseContext } from '../../hooks/useExerciseContext';

const ExerciseRightPanel = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const { exercises, dispatch } = useExerciseContext();
    const { user } = useAuthContext();
    const [topThreeFrequentTypes, setTopThreeFrequentTypes] = useState([]);

    const closePop = () => {
        setOpenPopup(false)
    }

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch('/exercise/rec', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_EXERCISES', payload: json})
                const findTopThreeFrequentExerciseTypes = (exercises) => {
                  const frequencyMap = exercises.reduce((acc, exercise) => {
                    acc[exercise.exerciseType] = (acc[exercise.exerciseType] || 0) + 1;
                    return acc;
                  }, {});
            
                  const sortedTypes = Object.entries(frequencyMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([exerciseType]) => exerciseType);
            
                  return sortedTypes;
                };
            
                setTopThreeFrequentTypes(findTopThreeFrequentExerciseTypes(exercises));
            }
        }
        fetchExercise();
      }, [dispatch, user]);

    return (
      <div className="right-panel">
        <div className='userCardContainer'>
            <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
            <div className='userCardTypeA'> <div className='text-center text-xl tracking-tight'>Click a date to add activity</div></div>
        </div>
        <div className='calendar'>
            <div className="calendar-container">
                <Calendar 
                  onChange={setSelectedDate}
                  value={selectedDate}
                  onClickDay={() => setOpenPopup(true)}
                />
                <Popup open={openPopup} onClose={() => setOpenPopup(false)} position="left center">
                    <AddActivity 
                        onClosePop={closePop}
                        date={selectedDate}
                    />
                </Popup>
            </div>
        </div>
        <div className='recTitle'>
          <div className='p-5'>
              <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="mb-2 text-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Recommended exercises</h5>
                  <p class="font-normal text-center text-gray-700 dark:text-gray-400">
                    {topThreeFrequentTypes[0] && topThreeFrequentTypes[0]}
                    <br />
                    {topThreeFrequentTypes[1] && topThreeFrequentTypes[1]}
                    <br />
                    {topThreeFrequentTypes[2] && topThreeFrequentTypes[2]}
                  </p>
              </a>
          </div>
        </div>
        
    </div>
    );
};

export default ExerciseRightPanel;
