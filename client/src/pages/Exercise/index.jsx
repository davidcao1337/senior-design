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
            <titleContainer>
                <div>Exercise</div>
            </titleContainer>
            <exerciseLogContainer>
                <cardHeader>
                    <cardTitle>Weekly Summary</cardTitle>
                </cardHeader>
                <innerContainer>
                <exerciseLogSection>
                    <exerciseLabel><div> Exercise Time </div></exerciseLabel>
                    <exerciseDisplay>
                        <div className="exercise-info"> 
                            {exercises && exercises.length > 0 && exercises.slice(0, 7).reduce((total, exercise) => {
                                return total + (exercise.time || 0);
                            }, 0)} 
                            <p>mins</p>
                        </div>    
                    </exerciseDisplay>
                </exerciseLogSection>
                <exerciseLogSection>
                    <exerciseLabel><div> Calories Burned </div></exerciseLabel>
                    <exerciseDisplay>
                        <div className="exercise-info"> 
                            {exercises && exercises.length > 0 && exercises.slice(0, 7).reduce((total, exercise) => {
                                return total + (exercise.calorie || 0);
                            }, 0)}  
                            <p>kCals</p>
                        </div>
                    </exerciseDisplay>
                </exerciseLogSection>
                <exerciseLogSection>
                    <exerciseLabel><div> Exercise goal </div></exerciseLabel>
                    <div className="text-center font-semibold text-3xl">
                        {goals && goals.find(goal => goal.goalType === 'exercise')?.description}
                    </div>
                </exerciseLogSection>
                </innerContainer>
            </exerciseLogContainer>
            <activityContent>
                <activityContainer>
                    <cardHeaderTypeTwo>
                        <activityTitleText>Activities</activityTitleText>
                    </cardHeaderTypeTwo>
                    <div className="scrollable-exercises">
                        <div className="exercises">
                            {exercises && exercises.map((exercise) => (
                                <ExerciseCards key={exercise._id} exercise={exercise} />
                            ))}
                        </div>            
                    </div>
                </activityContainer>
                <chartContainer>
                    <cardHeader>
                        <cardTitle> Weekily Progress </cardTitle>
                    </cardHeader>
                    <ExerciseBarChart width='100%' height='330px'/>
                </chartContainer>
            </activityContent>
            </content>
            <RightPanel />
        </section>
    );
}

export default Exercise;