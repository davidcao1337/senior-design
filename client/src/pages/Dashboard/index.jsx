import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SleepLineChart from '../../components/Charts/SleepLineChart';
import ExerciseBarChart from '../../components/Charts/ExerciseBarChart';
import './dashboard.css';
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

    return (
        <section className="dashboard">
            <NavBar />
            <content>
                <h1 className="Title mb-5 font-bold text-3xl text-[#525252]">My Dashboard</h1>
                <div className="dashboardTopContainer">
                    <div className="dashboardCardHeaderTypeTwo">
                        <div className="dashboardCardTitle">Sleep Summary</div>
                    </div>
                    <div className="dashboardTopChartContainer">
                        <SleepLineChart width='100%' height='215%' />
                    </div>
                </div>
                <div className="dashboardBottomContainer">
                    <div className="dashboardNutritionContainer">
                        <div className="dashboardCardHeaderTypeTwo">
                            <div className="dashboardCardTitle">Nutrition Breakdown</div>
                        </div>
                        <div className="dashboardInnerContainer">
                            <div className="dashboardNutritionBreakdownContent">
                                <protein> Protein </protein>
                                <ProgressBar props={{ caloriesEaten: totalCals, macroCals: proteinCals, color: "#6a1b9a" }} />
                            </div>
                            <div className="dashboardNutritionBreakdownContent">
                                <carbs> Carbs </carbs>
                                <ProgressBar props={{ caloriesEaten: totalCals, macroCals: carbCals, color: "#00695c" }} />
                            </div>
                            <div className="dashboardNutritionBreakdownContent">
                                <fat> Fat </fat>
                                <ProgressBar props={{ caloriesEaten: totalCals, macroCals: fatCals, color: "#ef6c00" }} />
                            </div>
                        </div>
                    </div>
                    <div className="dashboardExerciseContainer">
                        <div className="cardHeaderTypeOne">
                            <div className="dashboardCardTitle">Exercise Summary</div>
                        </div>
                        <div className="dashboardBottomChartContainer">
                                <ExerciseBarChart width='100%' height='270%'/>
                        </div>
                    </div>
                </div>
            </content>
            <RightPanel />
        </section>
    );
};

export default Dashboard;