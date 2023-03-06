import React, {useEffect, useState, setState} from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';
import Popup from 'reactjs-popup';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';
import Activity from './activity';
import AddTime from './exercise_time';

const Exercise = () => {

    const [exerciseTime, setExerciseTime] = useState('');
    //const [minutes, setMins] = useState();

    const editTime = (newTime) => {
        const hours = Math.floor(newTime/60);
        const mins = newTime % 60;
        setExerciseTime(hours + ' hrs '+ mins + ' mins')
        //console.log(exerciseTime)
    }

    
    const [activities, setActivity] = useState([
        {task: 1, time_reps: 0, distance_set: 0, incline_weight: 0, calories: 0},
        {task: 2, time_reps: 0, distance_set: 0, incline_weight: 0, calories: 0},
        {task: 3, time_reps: 0, distance_set: 0, incline_weight: 0, calories: 0}
    ])

    const addActivity = (task, time_reps, distance_set, incline_weight, calories) => {
        const taskIndex = activities.findIndex(activity => activity.task == task);
        if (taskIndex !== -1) {
            const newActivities = [...activities];
            newActivities[taskIndex] = {
              ...newActivities[taskIndex],
              time_reps: time_reps,
              distance_set: distance_set,
              incline_weight: incline_weight,
              calories: calories
            };
            setActivity(newActivities);
        }
        //console.log(activities)
    };

    return (
        <section>
            <NavBar />
            <content>
            <titleContainer>
                <div>Exercise</div>
            </titleContainer>
            <exerciseLogContainer>
                <cardHeader>
                    <cardTitle>Daily Summary</cardTitle>
                </cardHeader>
                <innerContainer>
                <exerciseLogSection>
                    <exerciseLabel><div> Exercise Time </div></exerciseLabel>
                    <exerciseDisplay><div> {exerciseTime} </div></exerciseDisplay>
                        <Popup trigger={<button> Edit </button>} position="right center">
                                <AddTime onEditTime={editTime} />
                        </Popup>
                </exerciseLogSection>
                <exerciseLogSection>
                    <exerciseLabel><div> Calories Burned </div></exerciseLabel>
                    <exerciseDisplay><div> 492 kCals </div></exerciseDisplay>
                </exerciseLogSection>
                <exerciseLogSection>
                    <exerciseLabel><div> Distance Ran </div></exerciseLabel>
                    <exerciseDisplay><div> 1.25 mi </div></exerciseDisplay>
                </exerciseLogSection>
                </innerContainer>
            </exerciseLogContainer>
            <activityContent>
                <activityContainer>
                    <cardHeaderTypeTwo>
                        <activityTitleText>Today's Activity</activityTitleText>
                    </cardHeaderTypeTwo>
                    <activityBreakdownTypeTwo>
                        <addActivityButton>
                            <Popup trigger={<button> Click to add an activity </button>} position="right center">
                                <Activity onAddActivity={addActivity}/>
                            </Popup>
                        </addActivityButton>
                        <activityList>
                            <div className='tag'> Indoor Run </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Time </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[0].time_reps} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Distance </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[0].distance_set} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Incline </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[0].incline_weight} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[0].calories} </div> </activityBreakdownContent>
                        </activityList>
                        <activityList>
                            <div className='tag'> Lateral Pulldown </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Reps </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[1].time_reps} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Set </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[1].distance_set} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Weight </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[1].incline_weight} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[1].calories} </div> </activityBreakdownContent>
                        </activityList>
                        <activityList><div className='tag'> Dumbbell Squat </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Reps </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[2].time_reps} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Set </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[2].distance_set} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Weight </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[2].incline_weight} </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> {activities[2].calories} </div> </activityBreakdownContent>
                        </activityList>
                    </activityBreakdownTypeTwo>
                </activityContainer>
                <chartContainer>
                    <cardHeader>
                        <cardTitle> Weekily Progress </cardTitle>
                    </cardHeader>
                    <chartContent>
                        <ExerciseBarChart />
                    </chartContent>
                </chartContainer>
            </activityContent>
            </content>
            <rightBar></rightBar>

        </section>
    );
}

export default Exercise;