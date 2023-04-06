import './nutrition.css';
import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import AddFoodEntryPopup from './addFoodEntry';
import CalculateCaloriePopup from './calculateCalorieGoal';
import FoodDiaryEntries from './foodDiaryEntries';
import RenderNutritionGoals from './NutritionGoalRender';
import NutritionRightPanel from '../../components/RightPanel/nutritionRightPanel';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGoalsContext } from '../../hooks/useGoalsContext';
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

const getBmr = ( weight, height, age ) => {
    const bmr = (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(0);
    return bmr;
}

const Nutrition = () => {

    const { foodItems, dispatch } = useFoodItemContext();
    const { user } = useAuthContext();
    const { goals, dispatch: goalDispatch } = useGoalsContext();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false)
    const [date, setDate] = React.useState(new Date());

    var user_id = ""
    if (localStorage.getItem('user') !== null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [userDetails, setUser] = useState([])

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

        const fetchNutritionGoals = async() => {
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
            fetchFoodItems();
            fetchNutritionGoals();
        }
    }, [dispatch, user]);

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
    if (userBirthday !== null) {
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
    let mostCals = 0
    let mostCalsItem = {}
    let mostCarbs = 0
    let mostCarbsItem = {}
    let mostProtein = 0
    let mostProteinItem = {}
    let mostFat = 0
    let mostFatItem = {}

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
            if( foodItems[i].caloriesPerServing > mostCals){
                mostCalsItem = foodItems[i]
                mostCals = foodItems[i].caloriesPerServing
            }
            if(  foodItems[i].proteinPerServing > mostProtein){
                mostProteinItem = foodItems[i]
                mostProtein = foodItems[i].proteinPerServing
            }
            if( foodItems[i].fatPerServing > mostFat){
                mostFatItem = foodItems[i]
                mostFat = foodItems[i].fatPerServing
            }
            if( foodItems[i].carbsPerServing > mostCarbs){
                mostCarbsItem = foodItems[i]
                mostCarbs = foodItems[i].carbsPerServing
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

    const nutritionGoals = []
    let i
    if( goals ){
        for( i = 0; i < goals.length; i++){
            if( goals[i].goalType === "nutrition"){
                nutritionGoals.push(goals[i])
            }
        }
    }

    var userCalorieGoal = 0
    var userProteinGoal = 0
    var userCarbGoal = 0
    var userFatGoal = 0
    if( nutritionGoals && nutritionGoals.length > 0 ){
        for( i = 0; i < nutritionGoals.length; i++){
            if( nutritionGoals[i].description.includes("Daily calorie consumption (cal):")){
                const calorieGoalSplit = nutritionGoals[i].description.split(":")
                const calorieGoalInfo = calorieGoalSplit[1]
                const calorieGoalInfoSplit = calorieGoalInfo.split(" ")
                userCalorieGoal = parseInt(calorieGoalInfoSplit[1])
            }
            if( nutritionGoals[i].description.includes("Daily protein consumption (g):")){
                const proteinGoalSplit = nutritionGoals[i].description.split(":")
                const proteinGoalInfo = proteinGoalSplit[1]
                const proteinGoalInfoSplit = proteinGoalInfo.split(" ")
                userProteinGoal = parseInt(proteinGoalInfoSplit[1])
            }
            if( nutritionGoals[i].description.includes("Daily carb consumption (g):")){
                const carbGoalSplit = nutritionGoals[i].description.split(":")
                const carbGoalInfo = carbGoalSplit[1]
                const carbGoalInfoSplit = carbGoalInfo.split(" ")
                userCarbGoal = parseInt(carbGoalInfoSplit[1])
            }
            if( nutritionGoals[i].description.includes("Daily fat consumption (g):")){
                const fatGoalSplit = nutritionGoals[i].description.split(":")
                const fatGoalInfo = fatGoalSplit[1]
                const fatGoalInfoSplit = fatGoalInfo.split(" ")
                userFatGoal = parseInt(fatGoalInfoSplit[1])
            }
        }
    }

    var userBmr = 0
    if ( userWeight !== 'N/A' && userHeight !== 'N/A' && age !== 'N/A' ){
        userBmr = getBmr( userWeight, userHeight, age );
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
        calorieGoal: userCalorieGoal,
        proteinGoal: userProteinGoal,
        carbGoal: userCarbGoal,
        fatGoal: userFatGoal,
        lbsGoal: '',
        weightGoal: '',
        goals: nutritionGoals
    }

    // Toggle add food modal visibility
    const toggleAddFoodItem = () => {
        setIsModalOpen(!isModalOpen)
    }

    const toggleCalculateCalorieGoal = () => {
        setIsCalorieModalOpen(!isCalorieModalOpen)
    }

    return (
        <section>
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">Nutrition</h1>
                <div className='nutritionPageContent'>
                    <div className='foodDiaryCard'>
                        <div className='cardTitleContainer'>
                            <div className='cardTitleFoodDiary'>Food Diary</div>
                        </div>
                        {foodItems && foodItems.length === 0 &&
                        <div className='foodDiaryEmptyState'>
                            <FontAwesomeIcon icon={faPenToSquare} size="6x" color="grey"></FontAwesomeIcon>
                            <div className='foodDiaryEmptyStateMessage'>There are currently no entries in your diary to display.</div>
                            <div className='foodDiaryEmptyStateDesc'>To start using the food diary, add an entry.</div>
                            <button onClick={toggleAddFoodItem}><div className='addFoodTextButton'>Add Food Item</div></button>
                        </div>
                        }
                        {foodItems && foodItems.length > 0 && 
                        <div className='foodDiaryContainer'>
                            <button onClick={toggleAddFoodItem}><div className='addFoodTextButton'>Add Food Item</div></button>
                            <div className='foodEntriesListContainer'>
                            <div className='foodEntriesList'>
                            {breakfastItems && breakfastItems.length > 0 &&
                                <FoodDiaryEntries props = {{ props , id: 'Breakfast', display: breakfastItems}}/>
                            }
                            {lunchItems && lunchItems.length > 0 &&
                                <FoodDiaryEntries props = {{ props , id: 'Lunch', display: lunchItems}}/>
                            }
                            {dinnerItems && dinnerItems.length > 0 &&
                                <FoodDiaryEntries props = {{ props , id: 'Dinner', display: dinnerItems}}/>
                            }
                            {snackItems && snackItems.length > 0 &&
                                <FoodDiaryEntries props = {{ props , id: 'Snacks', display: snackItems}}/>
                            }
                            </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className='rightContent'>
                        <div className='nutritionBreakdownContainer'>
                            <div className='cardTitleContainer'>
                                <div className='cardTitleFoodDiary'>Nutrition Breakdown</div>
                            </div>
                            <div className='nutritionBreakdownContent'>
                                <div className='macroGraphs'>
                                    <protein> Protein </protein>
                                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: proteinCals, color: "#6a1b9a"}}/>
                                    <carbs> Carbs </carbs>
                                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: carbCals, color: "#00695c"}}/>
                                    <fat> Fat </fat>
                                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: fatCals, color: "#ef6c00"}}/>
                                </div>
                                <div className='calorieInformation'>
                                    <div className='calorieInformationSection'>
                                        <div className='calorieInformationTitle'>Calories Eaten</div>
                                        <div className='calorieInformationDisplay'>{totalCals}</div>
                                    </div>
                                    <div className='calorieInformationSection'>
                                        <div className='calorieInformationTitle'>Calories Remaining</div>
                                        <div className='calorieInformationDisplay'>{userCalorieGoal - totalCals}</div>
                                    </div>
                                    <div className='calorieInformationSection'>
                                        <div className='calorieInformationRow'>
                                            <div className='calorieInformationTitle'>Calorie Goal</div>
                                            {/* <button onClick={toggleCalculateCalorieGoal}><div className='testNewCalGoal'>Calculate New</div></button> */}
                                        </div>
                                        <div className='calorieInformationDisplay'>{userCalorieGoal}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='rightContentBottom'>
                            <div className='nutritionGoalContainer'>
                                <div className='cardTitleContainer'>
                                    <div className='cardTitleFoodDiary'>Nutrition Goals</div>
                                </div>
                                { nutritionGoals && nutritionGoals.length === 0 && 
                                    <div className='cardEmptyState'>
                                        <FontAwesomeIcon icon={faPenToSquare} size="5x" color="grey"></FontAwesomeIcon>
                                        <div className='foodDiaryEmptyStateMessage'>There are currently no nutrition goals to display.</div>
                                        <Link to='/account/profile'><button><div className='addGoalLinkButton'>Add Nutrition Goal.</div></button></Link>
                                    </div>
                                }
                                { nutritionGoals && nutritionGoals.length > 0 &&
                                    <div className='cardContent'>
                                        <RenderNutritionGoals goals={{nutritionGoals}}/>
                                    </div>
                                }
                            </div>
                            <div className='estimatedWeightCalculatorContainer'>
                                <div className='cardTitleContainer'>
                                    <div className='cardTitleFoodDiary'>Daily Macro Breakdown</div>
                                </div>
                                {foodItems && foodItems.length === 0 && 
                                    <div className='cardEmptyState'>
                                        <FontAwesomeIcon icon={faPenToSquare} size="5x" color="grey"></FontAwesomeIcon>
                                        <div className='foodDiaryEmptyStateMessage'>Add Food to Diary To See Your Macro Breakdown</div>
                                    </div>
                                }
                                <div className='cardContent'>
                                        <div className='macroBreakdownContent'>
                                            <div className='macroBreakDownSection'>
                                                <div className='macroBreakdownSectionTitle'>Most Calories</div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Food Item: </div>
                                                    <div className='macroBreakdownSectionItem'>{mostCalsItem.itemName}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Meal Category: </div>
                                                    <div className='macroBreakdownSectionMealCategory'>{mostCalsItem.mealCategory}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Calories: </div>
                                                    <div className='macroBreakdownSectionStat'>{mostCalsItem.caloriesPerServing}</div>
                                                </div>
                                            </div>
                                            <div className='macroBreakDownSection'>
                                                <div className='macroBreakdownSectionTitle'>Most Protein</div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Food Item: </div>
                                                    <div className='macroBreakdownSectionItem'>{mostProteinItem.itemName}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Meal Category: </div>
                                                    <div className='macroBreakdownSectionMealCategory'>{mostProteinItem.mealCategory}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Protein: </div>
                                                    <div className='macroBreakdownSectionStat'>{mostProteinItem.proteinPerServing}</div>
                                                </div>
                                            </div>
                                            <div className='macroBreakDownSection'>
                                                <div className='macroBreakdownSectionTitle'>Most Fat</div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Food Item: </div>
                                                    <div className='macroBreakdownSectionItem'>{mostFatItem.itemName}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Meal Category: </div>
                                                    <div className='macroBreakdownSectionMealCategory'>{mostFatItem.mealCategory}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Fat: </div>
                                                    <div className='macroBreakdownSectionStat'>{mostFatItem.fatPerServing}</div>
                                                </div>
                                            </div>
                                            <div className='macroBreakDownSection'>
                                                <div className='macroBreakdownSectionTitle'>Most Carbs</div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Food Item: </div>
                                                    <div className='macroBreakdownSectionItem'>{mostCarbsItem.itemName}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Meal Category: </div>
                                                    <div className='macroBreakdownSectionMealCategory'>{mostCarbsItem.mealCategory}</div>
                                                </div>
                                                <div className='macroBreakdownRow'>
                                                    <div className='macroBreakdownItem'>Carbs: </div>
                                                    <div className='macroBreakdownSectionStat'>{mostCarbsItem.carbsPerServing}</div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </content>
            <NutritionRightPanel userProps = {{ userProps }}/>
            {isModalOpen &&
                <AddFoodEntryPopup
                    isOpen={isModalOpen}
                    toggleModalVisibility={toggleAddFoodItem}
                    date={{date}}
                />
            }
            {isCalorieModalOpen &&
                <CalculateCaloriePopup
                    isOpen={isCalorieModalOpen}
                    toggleModalVisibility={toggleAddFoodItem}
                />
            }
        </section>
    );
}

export default Nutrition;
