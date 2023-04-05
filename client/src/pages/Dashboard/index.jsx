import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepLineChart';
import './dashboard.css';
import WeightLineChart from '../../components/Charts/WeightLineChart';
import RightPanel from '../../components/RightPanel';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProgressBar from '../Nutrition/ProgressBar';

const Dashboard = () => {

    const { foodItems, dispatch } = useFoodItemContext();

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchFoodItems = async () => {
            const response = await fetch('/nutrition', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_FOOD', payload: json })
            }
        }

        

        if (user) {
            fetchFoodItems();
        }
    }, [dispatch, user]);

    let totalCals = 0

    let totalProtein = 0

    let totalFat = 0

    let totalCarbs = 0

    let proteinCals = 0

    let fatCals = 0

    let carbCals = 0



    if (foodItems) {

        for (let i = 0; i < foodItems.length; i++) {

            // seperate into individual arrays

            totalCals = totalCals + (foodItems[i].servingsEaten * foodItems[i].caloriesPerServing)

            totalProtein = totalProtein + (foodItems[i].servingsEaten * foodItems[i].proteinPerServing)

            totalFat = totalFat + (foodItems[i].servingsEaten * foodItems[i].fatPerServing)

            totalCarbs = totalCarbs + (foodItems[i].servingsEaten * foodItems[i].carbsPerServing)

        }
        
        proteinCals = totalProtein * 4

        fatCals = totalFat * 9

        carbCals = totalCarbs * 4




    }

 

/*     useEffect(() => {
        // Reset values
        setCaloriesEaten(0);
        setProteinEaten(0);
        setCarbsEaten(0);
        setFatEaten(0);

        // Calculate total values from food items
        foodItems.forEach((item) => {
            setCaloriesEaten((caloriesEaten) => caloriesEaten + item.calories);
            setProteinEaten((proteinEaten) => proteinEaten + item.protein);
            setCarbsEaten((carbsEaten) => carbsEaten + item.carbs);
            setFatEaten((fatEaten) => fatEaten + item.fat);
        });
    }, [foodItems]); */



    return (
        <section className="dashboard">
            <NavBar />
            <content>
                <titleContainer>
                    <div> My Dashboard</div>
                </titleContainer>

                <div className='macroGraphs'>

                    <protein> Protein </protein>

                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: proteinCals, color: "#6a1b9a" }} />

                    <carbs> Carbs </carbs>

                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: carbCals, color: "#00695c" }} />

                    <fat> Fat </fat>

                    <ProgressBar props={{ caloriesEaten: totalCals, macroCals: fatCals, color: "#ef6c00" }} />

                </div>

                <div className="Pbar">
                    <h2 className="chart-label">Nutrition Breakdown:</h2>

                </div>

                <div className="charts">
                    {/* <h2 className="chart-label">Your Sleep Recently:</h2> */}
                    {/* <SleepBarChart width='100%' height='100%' /> */}
                </div>

                {/* <SleepBarChart height='300%' width='100%' /> */}

                <div className="chartContainer1">
                    <div className="cardTitle"> Weekily Progress </div>
                    <SleepBarChart width='100%' height='350%' />
                </div>

                {/* <div className="chart">
                    <h2 className="chart-label">Your Weight Over Time:</h2>
                    <WeightLineChart height={100} width={700} />
                </div> */}

                {/* <div className="nutrition-breakdown">
          <h2 className="chart-label">Nutrition Breakdown</h2>
          <div className="nutrition-row">
            <div className="nutrition-label">Protein:</div>
            <div className="nutrition-value">{proteinEaten}g</div>
          </div>
          <div className="nutrition-row">
            <div className="nutrition-label">Carbs:</div>
            <div className="nutrition-value">{carbsEaten}g</div>
          </div>
          <div className="nutrition-row">
            <div className="nutrition-label">Fat:</div>
            <div className="nutrition-value">{fatEaten}g</div>
          </div>
        </div> */}
            </content>

            <RightPanel />
        </section>
    );
};

export default Dashboard;
