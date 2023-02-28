import React, {useEffect, useState} from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';

const Exercise = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/exercise');
        const items = await data.json();
        setItems(items);
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
                    <exerciseDisplay><div> 1 hrs 23 mins </div></exerciseDisplay>
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
                            Click to add activity
                        </addActivityButton>
                        <activityList>
                            <div className='tag'> Indoor Run </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Time </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Distance </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Incline </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
                        </activityList>
                        <activityList>
                            <div className='tag'> Lateral Pulldown </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Reps </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Set </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Weight </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
                        </activityList>
                        <activityList><div className='tag'> Dumbbell Squat </div>
                            <activityBreakdownContent> <div>  </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Reps </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Set </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Weight </div> </activityBreakdownContent>
                            <activityBreakdownContent> <div> Calories </div> </activityBreakdownContent>
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