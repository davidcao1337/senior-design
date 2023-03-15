import React, {useEffect, useState, setState} from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';
import RightPanel from '../../components/RightPanel/exerciseRightPanel'
import { useExerciseContext } from '../../hooks/useExerciseChart';


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
                            {exercises && exercises.length > 0 && exercises[0].time !== undefined && exercises[6].time !== undefined &&
                                exercises[0].time + exercises[1].time + exercises[2].time + exercises[4].time + exercises[5].time + exercises[6].time} 
                            <p>mins</p>
                        </div>    
                    </exerciseDisplay>
                </exerciseLogSection>
                <exerciseLogSection>
                    <exerciseLabel><div> Calories Burned </div></exerciseLabel>
                    <exerciseDisplay>
                        <div className="exercise-info"> 
                            {exercises && exercises.length > 0 && exercises[0].calorie !== undefined && exercises[6].calorie !== undefined &&
                                exercises[0].calorie + exercises[1].calorie + exercises[2].calorie + exercises[4].calorie + exercises[5].calorie + exercises[6].calorie} 
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
                        <activityTitleText>Today's Activity</activityTitleText>
                    </cardHeaderTypeTwo>
                    <activityBreakdownTypeTwo>
                        <table class="table-auto">
                            <thead>
                                <tr>
                                <th class="px-1 py-3 text-left font-black">Cardio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Time</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Cardio" 
                                    && (
                                        <>
                                          {exercises[0].time}
                                          <p class="inline ml-1">mins</p>
                                        </>
                                      )}
                                </td>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Distance</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Cardio" 
                                    && (
                                        <>
                                          {exercises[0].distance}
                                          <p class="inline ml-1">km</p>
                                        </>
                                      )}
                                </td>
                                </tr>
                                <tr>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Calorie</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Cardio" 
                                    && (
                                        <>
                                          {exercises[0].calorie}
                                          <p class="inline ml-1">kCals</p>
                                        </>
                                      )}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <thead>
                                <tr>
                                <th class="px-1 pt-8 pb-3 text-left font-black">Strength</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Time</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Strength" 
                                    && (
                                        <>
                                          {exercises[0].time}
                                          <p class="inline ml-1">mins</p>
                                        </>
                                      )}
                                </td>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Loads</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Strength" 
                                    && (
                                        <>
                                          {exercises[0].loadWeight}
                                          <p class="inline ml-1">kg</p>
                                        </>
                                      )}
                                </td>
                                </tr>
                                <tr>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Sets</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Strength" 
                                    && exercises[0].sets}
                                </td>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Reps</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Strength" 
                                    && (
                                        <>
                                          {exercises[0].reps}
                                          <p class="inline ml-1">per set</p>
                                        </>
                                      )}
                                </td>
                                </tr>
                                <tr>
                                <td class="px-4 py-2 font-bold fixed-width fixed-height">Calorie</td>
                                <td class="px-4 py-2 fixed-width fixed-height">
                                    {exercises 
                                    && exercises[0].type === "Strength" 
                                    && (
                                        <>
                                          {exercises[0].calorie}
                                          <p class="inline ml-1">kCals</p>
                                        </>
                                      )}
                                </td>
                                </tr>
                            </tbody>            
                    </activityBreakdownTypeTwo>
                </activityContainer>
                <chartContainer>
                    <cardHeader>
                        <cardTitle> Weekily Progress </cardTitle>
                    </cardHeader>
                    <chartContent>
                        <ExerciseBarChart/>
                    </chartContent>
                </chartContainer>
            </activityContent>
            </content>
            <RightPanel />
        </section>
    );
}

export default Exercise;