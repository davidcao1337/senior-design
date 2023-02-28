import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import './dashboard.css';
import WeightLineChart from '../../components/Charts/WeightLineChart';
import RightPanel from '../../components/RightPanel';

const Dashboard = () => {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/dashboard');
        const items = await data.json();
        setItems(items);
    };

    return (
        <section className="dashboard">
            <NavBar />
            <div className="dashboard-header">My Dashboard</div>
            {/* <div className="content">
                {items.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.msg}</p>
                    </div>
                ))}
            </div> */}
            <div className="charts">
                <h2 className="chart-label">Your Sleep Recently:</h2>
                <SleepBarChart height={100} width={600} />
            </div>

            <div className="chart">
                <h2 className="chart-label">Your Weight Over Time:</h2>
                <WeightLineChart height={100} width={600} />
            </div>

            <div className="nutrition-breakdown">
                <h2 className="chart-label">Nutrition Breakdown</h2>
                <div className="nutrition-row">
                    <div className="nutrition-label">Protein:</div>
                    <div className="nutrition-value">24g</div>
                </div>
                <div className="nutrition-row">
                    <div className="nutrition-label">Carbs:</div>
                    <div className="nutrition-value">50g</div>
                </div>
                <div className="nutrition-row">
                    <div className="nutrition-label">Fat:</div>
                    <div className="nutrition-value">12g</div>
                </div>
            </div>

            <RightPanel />
        </section>
    );
};

export default Dashboard;
