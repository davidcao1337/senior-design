import React, {useEffect, useState, setState} from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';
import RightPanel from '../../components/RightPanel/exerciseRightPanel'
import { useExerciseContext } from '../../hooks/useExerciseChart';
import ExerciseCards from './exerciseCards';


const Exercise = () => {
    const { exercises, dispatch } = useExerciseContext()
    useEffect( () => {
        const fetchExerciseTime = async () => {
            const response = await fetch('/exercise')
            const json = await response.json()

            if(response.ok){
                //setExercises(json)
                dispatch({type: 'SET_EXERCISES', payload: json})
            }
        }

        fetchExerciseTime()
    },[])

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
                    <exerciseLabel><div> Exercise Goal </div></exerciseLabel>
                    <div className="text-center pr-20">Weight Goal: </div>
                    <div className="text-center pr-20">Calories Goal:</div>
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
                    
                    <ExerciseBarChart/>
                    
                </chartContainer>
            </activityContent>
            </content>
            <RightPanel />
        </section>
    );
}

export default Exercise;