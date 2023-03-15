import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import SleepLineChart from '../../components/Charts/SleepLineChart';
import Popup from 'reactjs-popup';
import SleepGoal from './sleepGoal';
import RightBar from '../../components/RightPanel/sleepRightPanel';
import { SleepContextProvider } from '../../context/SleepContext';
import './sleep.css';
const Sleep = () => {

    const [sleepTime, setTime] = useState([8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0, 8.9, 7.6, 7.9, 10.0, 8.8, 11.0, 9.5]);
    const [sleepWeek, setWeek] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    const [displayTime, setDisplay] = useState();
    const [sleepGoal, setGoal] = useState();
    const [aveSleep, setAve] = useState();
    const [sleeps, setSleeps] = useState(null);

    const updateSleepTime  = (sleepTime) => {
        const totalTime = Number(sleepTime);
        const hours = Math.floor(totalTime);
        const mins = Math.floor(totalTime % Math.floor(totalTime) * 60);
        setDisplay(hours + ' hrs '+ mins + ' mins');
        //return <p> {displayTime} </p>
    }

    const updateSleepGoal = (newGoal) => {
        const time = Number(newGoal);
        const hours = Math.floor(time);
        const mins = Math.floor(time % Math.floor(time) * 60);
        setGoal(hours + ' hrs '+ mins + ' mins');
    }

    const updateAveSleep = (sleepTime) => {
        const weekly = parseFloat((sleepTime.slice(-7).reduce((sum, time) => sum + time, 0) / 7).toFixed(2));
        const hours = Math.floor(weekly);
        const mins = Math.floor(weekly % Math.floor(weekly) * 60);
        setAve(hours + ' hrs '+ mins + ' mins');
    }

    const addSleepTime = (newTime) => {
        setTime([
            ...sleepTime,
            newTime
        ])
        setWeek(prevState => [...prevState.slice(1),prevState[0]]);
        //console.log(sleepTime)
    }

    // useEffect( () => {
    //     updateSleepTime(sleepTime);
    //     updateAveSleep(sleepTime);
    // },[sleepTime])

    useEffect( () => {
        const fetchSleeps = async () => {
            const response = await fetch('/sleep')
            const json = await response.json()

            if(response.ok){
                setSleeps(json)
                // console.log(json[0].hours)
                // console.log((json[0].hours).typeof)
                // updateSleepTime(Number(json[0].hours))
            }
        }

        //<RightBar onAddSleepTime={addSleepTime}/>

        fetchSleeps()
    },[])
    
    return(
        <section>
            <SleepContextProvider>
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
                    <sleepAveContainer>
                    <sleepLineChart>
                        <cardTitle>
                            7 days average sleep time: {aveSleep}
                        </cardTitle>
                        <SleepLineChart />
                    </sleepLineChart>
                    </sleepAveContainer>    
            </content>
            <RightBar />
            </SleepContextProvider>
        </section>
    )
}

export default Sleep;