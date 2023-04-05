import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png';
import { useAuthContext } from '../../hooks/useAuthContext';

const NutritionRightPanel = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
      <div className="right-panel">
        <div className='userCardContainer'>
            <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
            <div className='userCardTypeA'> <div className='text-center text-xl tracking-tight'>Eating healthy!</div></div>
        </div>
        <div className='calendar'>
            <div className="calendar-container">
                <Calendar 
                  onChange={setSelectedDate}
                  value={selectedDate}
                />
            </div>
        </div>
        <div className='recTitle'>
          <div className='p-5'>
              <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="mb-2 text-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Recommended Foods</h5>
                  <p class="font-normal text-center text-gray-700 dark:text-gray-400">
                    <h6>Chicken</h6>
                    <div>Calories: 284</div>
                    <div>Protein(g): 53</div>
                    <br />
                    <h6>Eggs</h6>
                    Calories: 284
                    Protein(g): 53
                    <br />
                    <h6>Salmon</h6>
                    <div>Calories: 175</div>
                    <div>Protein(g): 19</div>
                  </p>
              </a>
          </div>
        </div>
        
    </div>
    );
};

export default NutritionRightPanel;