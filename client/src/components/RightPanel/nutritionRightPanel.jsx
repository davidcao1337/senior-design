import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFoodsContext } from '../../hooks/useFoodsContext'
import { Link } from "react-router-dom";


const NutritionRightPanel = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useAuthContext();
  const { foods, dispatch } = useFoodsContext();

  const nutritionGoals = props.userProps.userProps.goals

  const recommendationProperties = {
    caloriesEaten: props.userProps.userProps.cals,
    carbsEaten: props.userProps.userProps.carbs,
    proteinEaten: props.userProps.userProps.protein,
    fatEaten: props.userProps.userProps.fat,
    calorieGoal: props.userProps.userProps.calorieGoal,
    proteinGoal: props.userProps.userProps.proteinGoal,
    carbGoal: props.userProps.userProps.carbGoal,
    fatGoal: props.userProps.userProps.fatGoal
  }

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/foods', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_FOOD', payload: json})
      }
    }
    fetchFoods();
  }, [user]);

  function getRecommendedFoods( userProps, nutritionGoals, foods ) {
    var recommendedFoods = []
    const calorieGoal = userProps.calorieGoal
    const caloriesEaten = userProps.caloriesEaten
    const proteinGoal = userProps.proteinGoal
    const proteinEaten = userProps.proteinEaten
    const carbGoal = userProps.carbGoal
    const carbsEaten = userProps.carbsEaten
    const fatGoal = userProps.fatGoal
    const fatEaten = userProps.fatEaten

    // find foods closest to calorie goal
    let recFoodCals = []
    if( calorieGoal !== 0 ){
      let targetCals = Math.abs(calorieGoal - caloriesEaten)
      for( let i = 0; i < foods.length; i++ ){
        let foodCals = foods[i].caloriesPerServing
        let recPercentage = (foodCals / targetCals) * 100
        let newFood = { ...foods[i], recommended: recPercentage }
        if( recFoodCals.length === 0 ){
          recFoodCals.push(newFood)
        }
        else{
          for( let j = 0; j < recFoodCals.length; j++ ){
            if( recFoodCals[j].recommended < recPercentage ){
              recFoodCals.splice( j, 0, newFood )
              break
            }
            else if( j === recFoodCals.length && recFoodCals[j].recommended > recPercentage){
              recFoodCals.push(newFood)
              break
            }
          }
        }
      }
      for( let i = 0; i < 3; i++){
        recommendedFoods.push(recFoodCals[i])
      }
    }

    // find foods closest to protein goal
    let recFoodPro = []
    if( proteinGoal !== 0 ){
      let targetProtein = Math.abs(proteinGoal - proteinEaten)
      for( let i = 0; i < foods.length; i++ ){
        let foodPro = foods[i].proteinPerServing
        let recPercentage = (foodPro / targetProtein) * 100
        let newFood = { ...foods[i], recommended: recPercentage }
        if( recFoodPro.length === 0 ){
          recFoodPro.push(newFood)
        }
        else{
          for( let j = 0; j < recFoodPro.length; j++ ){
            if( recFoodPro[j].recommended < recPercentage ){
              recFoodPro.splice( j, 0, newFood )
              break
            }
            else if( j === recFoodPro.length && recFoodPro[j].recommended > recPercentage){
              recFoodPro.push(newFood)
              break
            }
          }
        }
      }
      for( let i = 0; i < 3; i++){
        recommendedFoods.push(recFoodPro[i])
      }
    }

    // find foods closest to protein goal
    let recFoodCarb = []
    if( carbGoal !== 0 ){
      let targetCarb = Math.abs(carbGoal - carbsEaten)
      for( let i = 0; i < foods.length; i++ ){
        let foodCarb = foods[i].carbsPerServing
        let recPercentage = (foodCarb / targetCarb) * 100
        let newFood = { ...foods[i], recommended: recPercentage }
        if( recFoodCarb.length === 0 ){
          recFoodCarb.push(newFood)
        }
        else{
          for( let j = 0; j < recFoodCarb.length; j++ ){
            if( recFoodCarb[j].recommended < recPercentage ){
              recFoodCarb.splice( j, 0, newFood )
              break
            }
            else if( j === recFoodCarb.length && recFoodCarb[j].recommended > recPercentage){
              recFoodCarb.push(newFood)
              break
            }
          }
        }
      }
      for( let i = 0; i < 3; i++){
        recommendedFoods.push(recFoodCarb[i])
      }
    }

    // find foods closest to fat goal
    let recFoodFat = []
    if( fatGoal !== 0 ){
      let targetFat = Math.abs(fatGoal - fatEaten)
      for( let i = 0; i < foods.length; i++ ){
        let foodFat = foods[i].fatPerServing
        let recPercentage = (foodFat / targetFat) * 100
        let newFood = { ...foods[i], recommended: recPercentage }
        if( recFoodFat.length === 0 ){
          recFoodFat.push(newFood)
        }
        else{
          for( let j = 0; j < recFoodFat.length; j++ ){
            if( recFoodFat[j].recommended < recPercentage ){
              recFoodFat.splice( j, 0, newFood )
              break
            }
            else if( j === recFoodFat.length && recFoodFat[j].recommended > recPercentage){
              recFoodFat.push(newFood)
              break
            }
          }
        }
      }
      for( let i = 0; i < 3; i++){
        recommendedFoods.push(recFoodFat[i])
      }
    }

    return recommendedFoods
  };
  
  let userRecommendations = []

  if( nutritionGoals && nutritionGoals.length > 0 ){
    const initialRecommendations = getRecommendedFoods( recommendationProperties, nutritionGoals, foods )
    let refinedRecommendation = []
    for( let i = 0; i < initialRecommendations.length; i++ ){
      // populate first array input
      if( refinedRecommendation.length === 0 ){
        refinedRecommendation.push( initialRecommendations[i] )
      }
      else {
        for( let j = 0; j < refinedRecommendation.length; j++ ){
          if( refinedRecommendation[j].itemName === initialRecommendations[i].itemName ){
            break
          }
          else if( refinedRecommendation[j].recommended < initialRecommendations[i].recommended ){
            refinedRecommendation.splice( j, 0, initialRecommendations[i] )
            break
          }
          else if( j === refinedRecommendation.length && refinedRecommendation[j].recommended > initialRecommendations[i].recommended ){
            refinedRecommendation.push( initialRecommendations[i] )
            break
          }
        }
      }
    }

    for( let k = 0; k < 3; k++ ){
      if( refinedRecommendation[k] ){
        userRecommendations.push( refinedRecommendation[k] )
      }
    }
    console.log( userRecommendations )
  }

  console.log( userRecommendations )

  return (
    <div className="right-panel">
      <div className='userCardContainer'>
        <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
        <div className='userCardTypeA'> <div className='text-center text-xl tracking-tight'>Eating healthy!</div></div>
      </div>
      <div className='calendar'>
        <div className="calendar-container">
          <Calendar 
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </div>
      </div>
      <div className='recTitle'>
      { nutritionGoals && nutritionGoals.length === 0 && 
        <div className='cardEmptyState'>
          <div className='foodDiaryEmptyStateMessage'>Create Nutrition Goals to begin using Recommendations</div>
          <Link to='/account/profile'><button><div className='addGoalLinkButton'>Add Nutrition Goal.</div></button></Link>
        </div>
        }
        { userRecommendations && userRecommendations.length > 0 && 
        <div className='p-5'>
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Your Recommended Foods</h5>
            <div className='recommendationContainer'>
              <div className='recommendationTitle'>{userRecommendations[0].itemName}</div>
              <div className='foodPropsContainer'>
                <div className='foodProp'>
                  <div className='propTitle'>Calories</div>
                  <div className='property'>{userRecommendations[0].caloriesPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Protein</div>
                <div className='property'>{userRecommendations[0].proteinPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Carbs</div>
                <div className='property'>{userRecommendations[0].carbsPerServing}</div>
                </div>
                <div className='foodProp'>
                  <div className='propTitle'>Fat</div>
                  <div className='property'>{userRecommendations[0].fatPerServing}</div>
                </div>
              </div>
            </div>
            { userRecommendations && userRecommendations.length > 1 && 
            <div className='recommendationContainer'>
              <div className='recommendationTitle'>{userRecommendations[1].itemName}</div>
              <div className='foodPropsContainer'>
                <div className='foodProp'>
                  <div className='propTitle'>Calories</div>
                  <div className='property'>{userRecommendations[1].caloriesPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Protein</div>
                <div className='property'>{userRecommendations[1].proteinPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Carbs</div>
                <div className='property'>{userRecommendations[1].carbsPerServing}</div>
                </div>
                <div className='foodProp'>
                  <div className='propTitle'>Fat</div>
                  <div className='property'>{userRecommendations[1].fatPerServing}</div>
                </div>
              </div>
            </div>
            }
            { userRecommendations && userRecommendations.length > 2 && 
            <div className='recommendationContainer'>
              <div className='recommendationTitle'>{userRecommendations[2].itemName}</div>
              <div className='foodPropsContainer'>
                <div className='foodProp'>
                  <div className='propTitle'>Calories</div>
                  <div className='property'>{userRecommendations[2].caloriesPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Protein</div>
                <div className='property'>{userRecommendations[2].proteinPerServing}</div>
                </div>
                  <div className='foodProp'>
                  <div className='propTitle'>Carbs</div>
                <div className='property'>{userRecommendations[2].carbsPerServing}</div>
                </div>
                <div className='foodProp'>
                  <div className='propTitle'>Fat</div>
                  <div className='property'>{userRecommendations[2].fatPerServing}</div>
                </div>
              </div>
            </div>
            }
          </a>
        </div>
        }
      </div>
    </div>
  );
};

export default NutritionRightPanel;