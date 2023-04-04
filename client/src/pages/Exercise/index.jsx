import React, { useEffect } from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';
import RightPanel from '../../components/RightPanel/exerciseRightPanel'
import { useExerciseContext } from '../../hooks/useExerciseContext';
import ExerciseCards from './exerciseCards';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGoalsContext } from '../../hooks/useGoalsContext';


const Exercise = () => {
    const { exercises, dispatch } = useExerciseContext();
    const { user } = useAuthContext();
    const { goals, dispatch: goalDispatch } = useGoalsContext();

    useEffect( () => {
        const fetchExerciseTime = async () => {
            const response = await fetch('/exercise', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_EXERCISES', payload: json})
            }
        }
        const fetchExerciseGoal = async() => {
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
            fetchExerciseTime();
            fetchExerciseGoal();
        }

    },[dispatch, user])

    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">Exercise</h1>
            <div className="exerciseLogContainer">
                <div className="cardHeader">
                    <div className="cardTitle">Weekly Summary</div>
                </div>
                <div className="innerContainer">
                <div className="exerciseLogSection">
                    <div className="cardHeaderTypeThree">
                        <div className="cardTitleTypeTwo"> Exercise Time </div>
                    </div>
                    <div className="exerciseDisplay">
                        <div className="exercise-info mt-4"> 
                            {exercises && exercises.length > 0 && exercises.slice(0, 7).reduce((total, exercise) => {
                                return total + (exercise.time || 0);
                            }, 0)} 
                            <p>mins</p>
                        </div>    
                    </div>
                </div>
                <div className="exerciseLogSection">
                    <div className="cardHeaderTypeThree">
                        <div className="cardTitleTypeTwo">Calories Burned</div>
                    </div>
                    <div className="exerciseDisplay">
                        <div className="exercise-info mt-4"> 
                            {exercises && exercises.length > 0 && exercises.slice(0, 7).reduce((total, exercise) => {
                                return total + (exercise.calorie || 0);
                            }, 0)}  
                            <p>kCals</p>
                        </div>
                    </div>
                </div>
                <div className="exerciseLogSection">
                    <div className="cardHeaderTypeThree">
                        <div className="cardTitleTypeTwo"> Exercise goal </div>
                    </div>
                    <div className="text-center mt-4 font-semibold text-3xl">
                        {goals && goals.find(goal => goal.goalType === 'exercise')?.description}
                    </div>
                </div>
                </div>
            </div>
            <div className="activityContent">
                <div className="activityContainer">
                    <div className="cardHeaderTypeTwo">
                        <div className="activityTitleText">Activities</div>
                    </div>
                    <div className="scrollable-exercises">
                        <div className="exercises">
                            {exercises && exercises.map((exercise) => (
                                <ExerciseCards key={exercise._id} exercise={exercise} />
                            ))}
                        </div>            
                    </div>
                </div>
                <div className="chartContainer">
                    <div className="cardTitle"> Weekily Progress </div>
                    <ExerciseBarChart width='100%' height='380%'/>
                </div>
            </div>
            </content>
            <RightPanel />
        </section>
    );
}

export default Exercise;