import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import SleepLineChart from '../../components/Charts/SleepLineChart';
import Popup from 'reactjs-popup';
import SleepGoal from './sleepGoal';
import RightBar from '../../components/RightPanel/sleepRightPanel';
import { useSleepContext } from '../../hooks/useSleepChart';
import SleepCards from './sleepCards';
import './sleep.css';


const Sleep = () => {
    const { sleeps, dispatch } = useSleepContext()
    const [sleepTime, setTime] = useState([8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0, 8.9, 7.6, 7.9, 10.0, 8.8, 11.0, 9.5]);
    const [sleepWeek, setWeek] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    const [displayTime, setDisplay] = useState();
    const [sleepGoal, setGoal] = useState();
    const [aveSleep, setAve] = useState();
    //const [sleeps, setSleeps] = useState(null);

    const updateSleepGoal = (newGoal) => {
        const time = Number(newGoal);
        const hours = Math.floor(time);
        const mins = Math.floor(time % Math.floor(time) * 60);
        setGoal(hours + ' hrs '+ mins + ' mins');
    }


    useEffect( () => {
        const fetchSleeps = async () => {
            const response = await fetch('/sleep')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_SLEEPS', payload: json})
            }
        }

        fetchSleeps()
    },[])
    
    return(
        <section>
            <NavBar />
            <content>
                    <titleContainer>
                        <div>Sleep</div>
                    </titleContainer>
                    <sleepLogContainer>
                        <cardHeader>
                            <cardTitle>Last Night Summary</cardTitle>
                        </cardHeader>
                        <statusContainer>
                            <statusContent>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Score </div></sleepLabel>
                                    <sleepScore><div> 87 </div></sleepScore>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Time </div></sleepLabel>
                                    <sleepTime>
                                        <div className="sleep-info"> 
                                            {sleeps && sleeps.length > 0 && sleeps[0].hours !== undefined && sleeps[0].hours} 
                                            <p>Hrs</p>
                                            {sleeps && sleeps.length > 0 && sleeps[0].minutes !== undefined && sleeps[0].minutes} 
                                            <p>Mins</p>
                                        </div>
                                    </sleepTime>
                                </sleepLogSection>
                                <sleepLogSection>
                                    <sleepLabel><div> Sleep Goal </div></sleepLabel>
                                    <sleepTime><div> {sleepGoal} </div></sleepTime>
                                        <Popup trigger={<button> Edit </button>} position="right center">
                                            <SleepGoal onEditGoal={updateSleepGoal} />
                                        </Popup>
                                </sleepLogSection>
                            </statusContent>
                            <sleepBarChart>
                                <SleepBarChart sleepTime={sleepTime} sleepWeek={sleepWeek}/>
                            </sleepBarChart>
                        </statusContainer>
                    </sleepLogContainer>
                    <sleepBottomContent>
                        <sleepData>
                            <sleepDataTitle>Sleep Data</sleepDataTitle>
                            <div className="scrollable-sleeps">
                                <div className="sleeps">
                                    {sleeps && sleeps.map((sleep) => (
                                        <SleepCards key={sleep._id} sleep={sleep} />
                                    ))}
                                </div>
                            </div>
                        </sleepData>
                    <sleepLineChart>
                        <cardTitle>
                            7 days average sleep time: {aveSleep}
                        </cardTitle>
                        <SleepLineChart />
                    </sleepLineChart>
                    </sleepBottomContent>    
            </content>
            <RightBar />
        </section>
    )
}

export default Sleep;