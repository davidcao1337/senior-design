import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import DiaryEntry from './diary';

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

    return (
        <section>
            <NavBar />
            <content>
            <titleContainer>
                <div>Nutrition</div>
            </titleContainer>
            <foodLogContainer>
                <cardHeader>
                    <cardTitle>Food Diary</cardTitle>
                    <addFood>
                        <Popup trigger={<button> Click to add food </button>} position="left center">
                            <DiaryEntry />
                        </Popup>
                    </addFood>
                </cardHeader>
                <diaryContainer>
                <foodLogSection>
                    <mealLabel><div> Breakfast </div></mealLabel>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Lunch </div></mealLabel>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Dinner </div></mealLabel>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Snack </div></mealLabel>
                </foodLogSection>
                </diaryContainer>

            </foodLogContainer>
            <bottomContent>
                <nutritionBreakdownContainer>
                    <cardHeader>
                        <cardTitle>Nutrition Breakdown</cardTitle>
                    </cardHeader>
                    <nutritionBreakdown>
                        <protein> Protein </protein>
                        <carbs> Carbs </carbs>
                        <fat> Fat </fat>
                    </nutritionBreakdown>
                </nutritionBreakdownContainer>
                <summaryContainer>
                    <cardHeader>
                        <cardTitle> Summary </cardTitle>
                    </cardHeader>
                    <summaryContent>
                        <calorieInfo> You have eaten </calorieInfo>
                        <calorieInfo> Your BMR is </calorieInfo>
                        <goal> Lose Gain Maintain </goal>
                        <div> 1 pounds per week </div>
                        <div> you have 1000 calories remaining </div>
                        <div> estimated weight in </div>
                    </summaryContent>
                </summaryContainer>
            </bottomContent>
            </content>
            <rightBar></rightBar>

        </section>
    );
}

export default Nutrition;