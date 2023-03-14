import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import RenderFoodLog from './FoodDiary';
import RenderNutitionSummaryCard from './NutritionSummaryRender';
import RightPanel from '../../components/RightPanel'


const getNutritionProperties = () => {
    
    const props = {
        mealLabels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        food: [],
        weight: { unit: 'lbs', amount: 116 },
        height: { unit: 'inches', amount: 64 },
        age: 21
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
                < RenderNutitionSummaryCard props = {{ props  }} />
            </bottomContent>
            </content>
            < RightPanel />
        </section>
    );
}

export default Nutrition;