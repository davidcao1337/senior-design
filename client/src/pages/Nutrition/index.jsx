import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import RenderFoodLog from './FoodDiary';

const getNutritionProperties = () => {
    const props = {
        mealLabels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        food: []
    };
    return props;
}

const Nutrition = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/nutrition');
        const items = await data.json();
        setItems(items);
    };

    // const { logout } = useLogout();

    const handleClick = () => {
      console.log('test');
    }

    let props = getNutritionProperties();


    return (
        <section>
            <NavBar />
            <content>
            <titleContainer>
                <div>Nutrition</div>
            </titleContainer>
            <card-container>
                <cardHeader>
                    <cardTitle>Food Diary</cardTitle>
                </cardHeader>
                <diaryContainer>
                <RenderFoodLog props = {{ props , id: 'Breakfast'}}/>
                <RenderFoodLog props = {{ props , id: 'Lunch'}}/>
                <RenderFoodLog props = {{ props , id: 'Dinner'}}/>
                <RenderFoodLog props = {{ props , id: 'Snack'}}/>
                </diaryContainer>
            </card-container>
            <bottomContent>
                <nutritionBreakdownContainer>
                    <cardHeaderBottom>
                        <cardTitle>Nutrition Breakdown</cardTitle>
                    </cardHeaderBottom>
                    <nutritionBreakdown>
                        <protein> Protein </protein>
                        <carbs> Carbs </carbs>
                        <fat> Fat </fat>
                    </nutritionBreakdown>
                </nutritionBreakdownContainer>
                <summaryContainer>
                    <cardHeaderBottom>
                        <cardTitle> Summary </cardTitle>
                    </cardHeaderBottom>
                    <summaryContent>
                        <summarySection> 
                            <div>You have eaten </div> 
                            <userCalc> 1220 </userCalc>
                            <div> calories today </div>
                        </summarySection>
                        <summarySection>
                            <div> Your BMR is </div>
                            <userCalc> 1263 </userCalc>
                        </summarySection>
                        <summarySection>
                            <selectionGoal>
                                <activeSel>Lose</activeSel>
                                <inactiveSel> Maintain </inactiveSel>
                                <inactiveSel> Gain </inactiveSel>
                            </selectionGoal>
                        </summarySection>
                        <summarySection>
                            <userCalc> 2 </userCalc>
                            <div>pounds per week </div>
                        </summarySection>
                        <summarySection>
                            <div> You have </div>
                            <userCalc> 108 </userCalc>
                            <div> calories remaining </div>
                        </summarySection>
                        <summarySection>
                            <div> Estimated weight in </div>
                            <userCalc> 5 </userCalc>
                            <div> weeks: </div>
                            <userCalc> 116 </userCalc>
                            <div> lbs </div>
                        </summarySection>
                    </summaryContent>
                </summaryContainer>
            </bottomContent>
            </content>
            <rightBar></rightBar>

        </section>
    );
}

export default Nutrition;