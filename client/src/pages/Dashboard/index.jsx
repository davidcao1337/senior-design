import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import './dashboard.css';
import WeightLineChart from '../../components/Charts/WeightLineChart';
import RightPanel from '../../components/RightPanel';
import NutritionProgressBar from './NutritionProgressBar';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';

const Dashboard = () => {
    const { foodItems } = useFoodItemContext();

    // Calculate total macro and calorie intake
    const [caloriesEaten, setCaloriesEaten] = useState(0);
    const [proteinEaten, setProteinEaten] = useState(0);
    const [carbsEaten, setCarbsEaten] = useState(0);
    const [fatEaten, setFatEaten] = useState(0);

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

    // Calculate total macro calories
    const macroCals = proteinEaten * 4 + carbsEaten * 4 + fatEaten * 9;

    return (
        <section className="dashboard">
            <NavBar />
            <content>
                <titleContainer>
                    <div> My Dashboard</div>
                </titleContainer>

                <div className="Pbar">
                    <h2 className="chart-label">Nutrition Breakdown:</h2>
                    <NutritionProgressBar
                        caloriesEaten={caloriesEaten}
                        macroCals={macroCals}
                    />
                </div>

                <div className="charts">
                    <h2 className="chart-label">Your Sleep Recently:</h2>
                    <SleepBarChart />
                </div>

                <div className="chart">
                    <h2 className="chart-label">Your Weight Over Time:</h2>
                    <WeightLineChart />
                </div>

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
