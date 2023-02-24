import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import DiaryEntry from './diary';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
            <card-container>
                <cardHeader>
                    <cardTitle>Food Diary</cardTitle>
                </cardHeader>
                <diaryContainer>
                <foodLogSection>
                    <mealLabel><div> Breakfast </div></mealLabel>
                    <labels>
                        <div>Item</div>
                        <div>Servings</div>
                        <div>Calories</div>
                    </labels>
                    <foodLog>
                        <div class="grid-item">Egg</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">182</div>
                        <div class="grid-item">Bacon</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">203</div>
                        <div class="grid-item">Coffee</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">25</div>
                    </foodLog>
                    <addFood>
                        <Popup trigger={<button> Click to add food </button>} position="left center">
                            <DiaryEntry />
                        </Popup>
                    </addFood>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Lunch </div></mealLabel>
                    <labels>
                        <div>Item</div>
                        <div>Servings</div>
                        <div>Calories</div>
                    </labels>
                    <foodLog>
                        <div class="grid-item">Chicken</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">172</div>
                        <div class="grid-item">Lettuce</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">30</div>
                        <div class="grid-item">Dressing</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">45</div>
                    </foodLog>
                    <addFood>
                        <Popup trigger={<button> Click to add food </button>} position="left center">
                            <DiaryEntry />
                        </Popup>
                    </addFood>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Dinner </div></mealLabel>
                    <labels>
                        <div>Item</div>
                        <div>Servings</div>
                        <div>Calories</div>
                    </labels>
                    <foodLog>
                        <div class="grid-item">Salmon</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">292</div>
                        <div class="grid-item">Asparagus</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">45</div>
                        <div class="grid-item">Butter</div>
                        <div class="grid-item">1</div>
                        <div class="grid-item">64</div>
                    </foodLog>
                    <addFood>
                        <Popup trigger={<button> Click to add food </button>} position="left center">
                            <DiaryEntry />
                        </Popup>
                    </addFood>
                </foodLogSection>
                <foodLogSection>
                    <mealLabel><div> Snack </div></mealLabel>
                    <labels>
                        <div>Item</div>
                        <div>Servings</div>
                        <div>Calories</div>
                    </labels>
                    <foodLog>
                        <div class="grid-item">Rice Cake</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">162</div>
                    </foodLog>
                    <addFood>
                        <Popup trigger={<button> Click to add food </button>} position="left center">
                            <DiaryEntry />
                        </Popup>
                    </addFood>
                </foodLogSection>
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