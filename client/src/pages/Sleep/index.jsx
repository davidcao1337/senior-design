import React from 'react';
import { useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import SleepLineChart from '../../components/Charts/SleepLineChart';
import RightBar from '../../components/RightPanel/sleepRightPanel';
import { useSleepContext } from '../../hooks/useSleepContext';
import SleepCards from './sleepCards';
import './sleep.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGoalsContext } from '../../hooks/useGoalsContext';

const Sleep = () => {
    const { sleeps, dispatch } = useSleepContext();
    const { user } = useAuthContext();
    const { goals, dispatch: goalDispatch } = useGoalsContext();

    useEffect( () => {
        const fetchSleeps = async () => {
            const response = await fetch('/sleep', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_SLEEPS', payload: json})
            }
        }
        const fetchSleepGoal = async() => {
             const response = await fetch('/goals', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json()
            if(response.ok){
                goalDispatch({type: 'SET_GOALS', payload: json})
            }
        }
        if(user){
            fetchSleeps();
            fetchSleepGoal();
        }
    },[dispatch, user])
    
    return(
        <section>
            <NavBar />
            <content>
                    <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">Sleep</h1>
                    <div className="sleepLogContainer">
                        <div className="cardHeader">
                            <div className="cardTitle mt-2 mb-2">Last Night Summary</div>
                        </div>
                        <div className="statusContainer">
                            <div className="statusContent">
                                <div className="sleepLogSection">
                                <div className="cardHeaderTypeThree">
                                    <div className="cardTitleTypeTwo"> Sleep Score </div>
                                </div>
                                    <div className="sleepScore"> 
                                        {sleeps && sleeps.length > 0 && sleeps[0].hours !== undefined && Math.floor((sleeps[0].hours+sleeps[0].minutes/60)/8*100)}  
                                    </div>
                                </div>
                                <div className="sleepLogSection">
                                <div className="cardHeaderTypeThree">
                                    <div className="cardTitleTypeTwo"> Sleep Time </div>
                                </div>
                                    <div className="sleepTime">
                                        <div className="sleep-info"> 
                                            {sleeps && sleeps.length > 0 && sleeps[0].hours !== undefined && sleeps[0].hours} 
                                            <p>Hrs</p>
                                            {sleeps && sleeps.length > 0 && sleeps[0].minutes !== undefined && sleeps[0].minutes} 
                                            <p>Mins</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sleepLogSection">
                                <div className="cardHeaderTypeThree">
                                    <div className="cardTitleTypeTwo"> Sleep Goal </div>
                                </div>
                                    <div className="text-center mt-2 font-semibold text-xl">
                                        {goals && goals.find(goal => goal.goalType === 'sleep')?.description}
                                    </div>
                                </div>
                            </div>
                            <div className="sleepBarChart">
                                <SleepBarChart width='110%' height='250%'/>
                            </div>
                        </div>
                    </div>
                    <div className="sleepBottomContent">
                        <div className="sleepData">
                            <div className="sleepDataTitle">Sleep Data</div>
                            <div className="scrollable-sleeps">
                                <div className="sleeps">
                                    {sleeps && sleeps.map((sleep) => (
                                        <SleepCards key={sleep._id} sleep={sleep} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="sleepLineChart">
                            <div className="cardTitle">Weekly Sleep Time</div>
                            <SleepLineChart width='100%' height='210%'/>
                        </div>
                    </div>    
            </content>
            <RightBar />
        </section>
    )
}

export default Sleep;