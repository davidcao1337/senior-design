import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import RenderFoodLog from './FoodDiary';
import RenderNutitionSummaryCard from './NutritionSummaryRender';
import RightPanel from '../../components/RightPanel'
import Calendar from 'react-calendar';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProgressBar from './ProgressBar';
import '../../components/RightPanel/rightPanel.css';


const getNutritionProperties = () => {
    
    // this will get specific food items according to the date 
    const props = {
        mealLabels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        food: [],
        weight: { unit: 'lbs', amount: 116 },
        height: { unit: 'inches', amount: 64 },
        age: 21,
        date: null,
        category: null
    };
    return props;
}

const getUserProperties = () => {

}

const Nutrition = () => {

    const { foodItems, dispatch } = useFoodItemContext();
    const { user } = useAuthContext();

    useEffect( ()=> {
        const fetchFoodItems = async () => {
            const response = await fetch('/nutrition', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_FOOD', payload: json})
            }
        }
        if(user){
            fetchFoodItems();
        }
    }, [dispatch, user]);

    var user_id = ""
    if (localStorage.getItem('user') != null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [userDetails, setUser] = useState([])

    useEffect( ()=> {
        const fetchUser = async() => {
            const userData = await fetch('/user/' + user_id);
            const userDetails = await userData.json();
            setUser(userDetails)
        }

        fetchUser();
    }, [user_id]);

    const userName = userDetails.name || "N/A"
    const userHeight = userDetails.height || "N/A"
    const userWeight = userDetails.weight || "N/A"
    const userBirthday = userDetails.birthday || null

    // Calculated Values
    // Age
    var ageCalc = null
    if (userBirthday != null) {
        const currentDate = new Date()
        const userBirthdate = new Date(userBirthday)
        const dateDifference = (currentDate - userBirthdate) / (1000 * 60 * 60 * 24 * 365.25)
        ageCalc = Math.floor(dateDifference)
    }
    var age = ageCalc || "N/A"

    // BMI
    var bmiCalc = null
    if (!isNaN(userHeight) && !isNaN(userWeight)) {
        bmiCalc = (userWeight / Math.pow((userHeight/100), 2)).toPrecision(3)
    }
    var bmi = bmiCalc || "N/A"

    const handleClick = () => {
      console.log('test');
    }

    let props = getNutritionProperties();

    let breakfastItems = []
    let lunchItems = []
    let dinnerItems = []
    let snackItems = []
    let totalCals = 0
    let totalProtein = 0
    let totalFat = 0
    let totalCarbs = 0
    let proteinCals = 0
    let fatCals = 0
    let carbCals = 0

    if( foodItems ){
        for (let i = 0; i < foodItems.length; i++) {
            // seperate into individual arrays
            if( foodItems[i].mealCategory === 'Breakfast'){
                breakfastItems.push(foodItems[i])
            }
            if( foodItems[i].mealCategory === 'Lunch'){
                lunchItems.push(foodItems[i])
            }
            if( foodItems[i].mealCategory === 'Dinner'){
                dinnerItems.push(foodItems[i])
            }
            if( foodItems[i].mealCategory === 'Snack'){
                snackItems.push(foodItems[i])
            }
            totalCals = totalCals + (foodItems[i].servingsEaten * foodItems[i].caloriesPerServing)
            totalProtein = totalProtein + (foodItems[i].servingsEaten * foodItems[i].proteinPerServing)
            totalFat = totalFat + (foodItems[i].servingsEaten * foodItems[i].fatPerServing)
            totalCarbs = totalCarbs + (foodItems[i].servingsEaten * foodItems[i].carbsPerServing)
        }
        proteinCals = totalProtein * 4
        fatCals = totalFat * 9
        carbCals = totalCarbs * 4
    }

    let userProps = { 
        name: userName, 
        height: userHeight, 
        weight: userWeight, 
        age: age,
        bmi: bmi,
        cals: totalCals, 
        protein: totalProtein,
        fat: totalFat,
        carbs: totalCarbs,
        calorieGoal: '',
        lbsGoal: '',
        weightGoal: ''
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
                    <RenderFoodLog props = {{ props , id: 'Breakfast', display: breakfastItems}}/>
                    <RenderFoodLog props = {{ props , id: 'Lunch', display: lunchItems}}/>
                    <RenderFoodLog props = {{ props , id: 'Dinner', display: dinnerItems}}/>
                    <RenderFoodLog props = {{ props , id: 'Snack', display: snackItems}}/>
                </diaryContainer>
            </card-container>
            <bottomContent>
                <nutritionBreakdownContainer>
                    <cardHeaderBottom>
                        <cardTitle>Nutrition Breakdown</cardTitle>
                    </cardHeaderBottom>
                    <nutritionBreakdown>
                        <protein> Protein </protein>
                        <ProgressBar props={{ caloriesEaten: totalCals, macroCals: proteinCals, color: "#6a1b9a"}}/>
                        <carbs> Carbs </carbs>
                        <ProgressBar props={{ caloriesEaten: totalCals, macroCals: carbCals, color: "#00695c"}}/>
                        <fat> Fat </fat>
                        <ProgressBar props={{ caloriesEaten: totalCals, macroCals: fatCals, color: "#ef6c00"}}/>
                    </nutritionBreakdown>
                </nutritionBreakdownContainer>
                < RenderNutitionSummaryCard props = {{ props, userProps }} />
            </bottomContent>
            </content>
            <RightPanel props = {{ props }}/>

        </section>
    );
}

export default Nutrition;
