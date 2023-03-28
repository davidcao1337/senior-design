import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import Popup from 'reactjs-popup';
import AddActivity from '../../pages/Exercise/addActivity';
import lyfeonLogo from '../../assets/lyfeon-green.png';
import { useExerciseContext } from '../../hooks/useExerciseContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const ExerciseRightPanel = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const { exercises, dispatch } = useExerciseContext();
    const { user } = useAuthContext();
    const [mostFrequentType, setMostFrequentType] = useState(null);

    const closePop = () => {
        setOpenPopup(false)
    }

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch('/exercise', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_EXERCISES', payload: json})
                const findMostFrequentExerciseType = (exercises) => {
                    const frequencyMap = exercises.reduce((acc, exercise) => {
                      acc[exercise.exerciseType] = (acc[exercise.exerciseType] || 0) + 1;
                      return acc;
                    }, {});
              
                    let maxCount = 0;
                    let mostFrequent = null;
                    for (const exerciseType in frequencyMap) {
                      if (frequencyMap[exerciseType] > maxCount) {
                        maxCount = frequencyMap[exerciseType];
                        mostFrequent = exerciseType;
                      }
                    }
                    return mostFrequent;
                  };
              
                  setMostFrequentType(findMostFrequentExerciseType(exercises));
            }
        }
        fetchExercise();
      }, [dispatch, user]);

    return (
      <div className="right-panel">
        <div className='userCardContainer'>
            <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
            <div className='userCard'></div>
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
                  <h5 class="mb-2 text-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Your favorite exercise</h5>
                  <p class="font-normal text-center text-gray-700 dark:text-gray-400">{mostFrequentType}</p>
              </a>
          </div>
        </div>
        
    </div>
    );
};

export default ExerciseRightPanel;
