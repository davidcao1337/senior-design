import React from 'react';
import { useState, useEffect } from 'react';
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
                                    <div class="text-center font-semibold text-3xl">
                                        {goals && goals.length > 0 && goals[0] !== undefined &&  goals[1] !== undefined && (
                                            goals[0].goalType === 'sleep' ? goals[0].description
                                            : goals[1].goalType === 'sleep' ? goals[1].description
                                            : "Sleep goal not found"
                                            )
                                        }
                                    </div>
                                </sleepLogSection>
                            </statusContent>
                            <sleepBarChart>
                                <SleepBarChart />
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
                        <cardTitle>Weekly Sleep Time</cardTitle>
                        <SleepLineChart />
                    </sleepLineChart>
                    </sleepBottomContent>    
            </content>
            <RightBar />
        </section>
    )
}

export default Sleep;