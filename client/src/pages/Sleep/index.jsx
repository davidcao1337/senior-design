import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import SleepLineChart from '../../components/Charts/SleepLineChart';
import Popup from 'reactjs-popup';
import AddSleepData from './sleepData';

import './sleep.css';
const Sleep = () => {

    const [sleepTime, setTime] = useState([8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0, 8.9, 7.6, 7.9, 10.0, 8.8, 11.0, 9.5]);
    
    const addSleepTime = (newTime) => {
        setTime([
            ...sleepTime,
            newTime
        ])
        //console.log(sleepTime)
    }
    
    return(
        <section>
            <NavBar />
            <content>
                    <titleContainer>
                        <div>Sleep</div>
                    </titleContainer>
                    <sleepLogContainer>
                        <statusContainer>
                            <statusContent>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Score </div></sleepLabel>
                                    <sleepScore><div> 87 </div></sleepScore>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Time </div></sleepLabel>
                                    <sleepTime>{<div> 7 hrs 48 mins </div>}</sleepTime>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Goal </div></sleepLabel>
                                    <sleepTime><div> 8 hrs 30 mins </div></sleepTime>
                                </sleepLogSection>
                            </statusContent>
                            <addSleep>
                                <Popup trigger={<button> Click to add sleep time N </button>} position="right center">
                                    <AddSleepData onAddSleepTime={addSleepTime}/>
                                </Popup>
                            </addSleep>
                            <sleepBarChart>
                                <SleepBarChart sleepTime={sleepTime}/>
                            </sleepBarChart>
                        </statusContainer>
                    </sleepLogContainer>

                    <sleepAveContainer>
                    <sleepLineChart>
                        <cardTitle>
                            7 days average sleep time: 7 hours 22 minutes
                        </cardTitle>
                        <SleepLineChart />
                    </sleepLineChart>
                    </sleepAveContainer>    
            </content>
            <rightBar></rightBar>
        </section>
        
    )
}

export default Sleep;